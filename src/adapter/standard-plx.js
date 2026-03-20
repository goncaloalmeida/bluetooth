import timely from '../logic/datetime.js';

const demo = document.body.querySelector('demo-view');
const DEBUG_PLX = false;

const HEART_RATE_MEASUREMENT_UUID = '00002a37-0000-1000-8000-00805f9b34fb';
const PLX_SPOT_CHECK_UUID = '00002a5e-0000-1000-8000-00805f9b34fb';
const PLX_CONTINUOUS_UUID = '00002a5f-0000-1000-8000-00805f9b34fb';

let previousMinute = 0;
let dataTable = [];

function logPlx(...args) {
  if (DEBUG_PLX) {
    console.log(...args);
  }
}

function decodeSfloat(raw) {
  let mantissa = raw & 0x0fff;
  if (mantissa >= 0x0800) {
    mantissa = -(0x1000 - mantissa);
  }

  let exponent = raw >> 12;
  if (exponent >= 0x0008) {
    exponent = -(0x0010 - exponent);
  }

  return mantissa * (10 ** exponent);
}

function updateReadings({ bpm, sats }) {
  if (Number.isFinite(sats) && sats >= 50 && sats <= 100) {
    demo.sats = Math.round(sats);
  }

  if (Number.isFinite(bpm) && bpm >= 20 && bpm <= 250) {
    demo.bpm = Math.round(bpm);
  }

  const now = timely().format('HH:mm');
  if (demo.sats !== null && demo.bpm !== null && now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, demo.sats, demo.bpm], ...dataTable];
    demo.data = dataTable;
  }
}

function parseHeartRateMeasurement(view) {
  if (view.byteLength < 2) return;

  const flags = view.getUint8(0);
  const isUint16 = (flags & 0x01) !== 0;
  const bpm = isUint16 ? view.getUint16(1, true) : view.getUint8(1);

  updateReadings({ bpm });
  logPlx('[PLX] heart-rate', { bpm, flags });
}

function parsePlxMeasurement(view, characteristicUuid) {
  if (view.byteLength < 5) return;

  const flags = view.getUint8(0);
  const sats = decodeSfloat(view.getUint16(1, true));
  const bpm = decodeSfloat(view.getUint16(3, true));

  updateReadings({ bpm, sats });
  logPlx('[PLX] oximetry', {
    characteristicUuid,
    sats,
    bpm,
    flags,
  });
}

export function createStandardPlxSession() {
  return {
    handleData(characteristicUuid, view) {
      if (characteristicUuid === HEART_RATE_MEASUREMENT_UUID) {
        parseHeartRateMeasurement(view);
        return;
      }

      if (characteristicUuid === PLX_SPOT_CHECK_UUID || characteristicUuid === PLX_CONTINUOUS_UUID) {
        parsePlxMeasurement(view, characteristicUuid);
        return;
      }

      const bytes = new Uint8Array(view.buffer.slice(0));
      const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join(' ');
  logPlx('[PLX] raw', characteristicUuid, hex);
    },
    cleanup() {
      // No background timers for the standard BLE profile.
    },
  };
}