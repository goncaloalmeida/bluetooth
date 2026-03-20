import timely from '../logic/datetime.js';

const demo = document.body.querySelector('demo-view');
const DEBUG_WELLUE = false;

const COMMANDS = {
  info: 0x14,
  readSensors: 0x17,
};

let previousMinute = 0;
let dataTable = [];

function logWellue(...args) {
  if (DEBUG_WELLUE) {
    console.log(...args);
  }
}

function crc8(data) {
  let crc = 0;

  for (const byte of data) {
    const chk = crc ^ byte;
    crc = 0;
    if (chk & 0x01) crc = 0x07;
    if (chk & 0x02) crc ^= 0x0e;
    if (chk & 0x04) crc ^= 0x1c;
    if (chk & 0x08) crc ^= 0x38;
    if (chk & 0x10) crc ^= 0x70;
    if (chk & 0x20) crc ^= 0xe0;
    if (chk & 0x40) crc ^= 0xc7;
    if (chk & 0x80) crc ^= 0x89;
  }

  return crc;
}

function buildPacket(command, data = [], block = 0) {
  const packet = [
    0xaa,
    command,
    command ^ 0xff,
    block & 0xff,
    block >> 8,
    data.length & 0xff,
    data.length >> 8,
    ...data,
  ];

  return new Uint8Array([...packet, crc8(packet)]);
}

async function writePacket(characteristic, packet) {
  for (let offset = 0; offset < packet.length; offset += 20) {
    const chunk = packet.slice(offset, offset + 20);

    if (characteristic.properties.writeWithoutResponse) {
      await characteristic.writeValueWithoutResponse(chunk);
    } else {
      await characteristic.writeValue(chunk);
    }
  }
}

function updateReadings({ bpm, sats, perfusionIndex }) {
  const now = timely().format('HH:mm');

  demo.sats = sats;
  demo.bpm = bpm;
  demo.bar = perfusionIndex;

  if (now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, sats, bpm], ...dataTable];
    demo.data = dataTable;
  }
}

export function createWelluePo6BSession(writeCharacteristic) {
  const decoder = new TextDecoder('utf-8');
  let buffer = new Uint8Array();
  let pollTimer = null;
  let debugNotificationCount = 0;

  function toHex(bytes) {
    return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join(' ');
  }

  function append(chunk) {
    const combined = new Uint8Array(buffer.length + chunk.length);
    combined.set(buffer);
    combined.set(chunk, buffer.length);
    buffer = combined;
  }

  function parsePacket(packet) {
    const command = packet[1];
    const payload = packet.slice(7, packet.length - 1);

    if (command === COMMANDS.info) {
      try {
        logWellue('wellue-info', JSON.parse(decoder.decode(payload)));
      } catch (err) {
        logWellue('wellue-info', decoder.decode(payload));
      }
      return;
    }

    if (command !== COMMANDS.readSensors || payload.length < 12) {
      return;
    }

    const sats = payload[0];
    const bpm = payload[1];
    const battery = payload[7];
    const motion = payload[9];
    const perfusionIndex = payload[10];
    const wornState = payload[11];

    if (wornState === 0 || (sats === 0 && bpm === 0)) {
      logWellue('wellue-status', { battery, motion, wornState });
      return;
    }

    updateReadings({ bpm, sats, perfusionIndex });
    logWellue('wellue-realtime', { sats, bpm, battery, motion, perfusionIndex });
  }

  function flush() {
    while (buffer.length >= 8) {
      if (buffer[0] !== 0xaa) {
        buffer = buffer.slice(1);
        continue;
      }

      const command = buffer[1];
      if ((command ^ 0xff) !== buffer[2]) {
        buffer = buffer.slice(1);
        continue;
      }

      const payloadLength = buffer[5] | (buffer[6] << 8);
      const packetLength = 7 + payloadLength + 1;
      if (buffer.length < packetLength) {
        return;
      }

      const packet = buffer.slice(0, packetLength);
      buffer = buffer.slice(packetLength);

      const expectedCrc = crc8(packet.slice(0, packet.length - 1));
      if (expectedCrc !== packet[packet.length - 1]) {
        if (DEBUG_WELLUE) {
          console.warn('wellue-crc-mismatch', packet);
        }
        continue;
      }

      parsePacket(packet);
    }
  }

  async function request(command) {
    await writePacket(writeCharacteristic, buildPacket(command));
  }

  return {
    async start() {
      await request(COMMANDS.info);
      await request(COMMANDS.readSensors);
      pollTimer = setInterval(() => {
        request(COMMANDS.readSensors).catch((err) => console.error(err));
      }, 2000);
    },
    handleData(e) {
      const chunk = new Uint8Array(e.target.value.buffer.slice(0));
      if (DEBUG_WELLUE && debugNotificationCount < 10) {
        logWellue('wellue-raw', chunk.length, toHex(chunk));
      }
      debugNotificationCount++;
      append(chunk);
      flush();
    },
    cleanup() {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    },
  };
}

export const createWelluePo6Session = createWelluePo6BSession;