import timely from '../logic/datetime.js';
import audio from '../logic/sound.js';

const demo = document.body.querySelector('demo-view');
const DEBUG_VIATOM = false;

let previousMinute = 0;
let xAxis = 0;
let yAxis = 100;

let dataTable = [];

const LEGACY_HEADER_1 = 0xaa;
const LEGACY_HEADER_2 = 0x55;
const LEGACY_DATA_COMMAND = 0x0f;

/**
 * Parse stream from pulse oximeter
 * 254 = new line
 * Vitals (10) => 254 10 85 || STATUS(1 = no sensor, 0 = ok) || HR SpO2  ? (10-17),  ? (2-234), time (183-201), ? (10-223)
 * Graph (8) => 254 8 86 || X(16-68) 0 X(3-12) X(0-255)-TIME X(0-255)
 */
export function handleData(e) {
  const t = e.target;
  const { value } = t; // ArrayBuffer

  let data = [];
  for (let i = 0; i < value.byteLength; i++) {
    data.push(value.getUint8(i));
  }

  if (isLegacyPacket(data)) {
    parseLegacyFrames(data);
    return;
  }

  let i = 0;
  while (data.length > 0) {
    i++;

    const [b1, b2, b3] = data;

    if (isVitals(b1, b2, b3)) {
      parseVitals(data.slice(4, 10));

      if (DEBUG_VIATOM) {
        console.log('vitals',
          `${data[8]}s`, // time
          data[3] === 0 ? 'ok' : `Status ${data[3]}`,
          `HR ${data[4]} SpO2 ${data[5]}`,
          `?${data[6]}`,
          `?${data[7]}`,
          `?${data[9]}`,
        );
      }

      data = data.slice(10, data.length);
    } else if (isGraph(b1, b2, b3)) {
      parseGraph(data[3], data[6]);
      parseSignal(data[5]);

      if (DEBUG_VIATOM && data[5] > 15) {
        console.error(`more than 15 ${data[5]}`);
      }

      if (DEBUG_VIATOM) {
        console.log('graph',
          data[4] === 0 ? 'ok' : `Status ${data[4]}`,
          `Trace ${data[3]}, ${data[5]}`, // graph height, bar graph
          `Time ${data[6]} ${data[7]}`
        );
      }

      data = data.slice(8, data.length);
    } else {
      if (DEBUG_VIATOM) {
        console.debug('[VIATOM] Unparsed packet', data);
      }
      data = [];
    }

    if (i === 20) break;
  }
}

function isLegacyPacket(data) {
  return data.length >= 4
    && data[0] === LEGACY_HEADER_1
    && data[1] === LEGACY_HEADER_2;
}

function parseLegacyFrames(data) {
  let stream = [...data];

  while (stream.length >= 4) {
    if (stream[0] !== LEGACY_HEADER_1 || stream[1] !== LEGACY_HEADER_2) {
      stream = stream.slice(1);
      continue;
    }

    const command = stream[2];
    const payloadLength = stream[3];
    const frameLength = 4 + payloadLength;

    if (stream.length < frameLength) {
      return;
    }

    const payload = stream.slice(4, frameLength);
    parseLegacyFrame(command, payload);
    stream = stream.slice(frameLength);
  }
}

function parseLegacyFrame(command, payload) {
  if (command !== LEGACY_DATA_COMMAND || payload.length < 2) {
    return;
  }

  const frameType = payload[0];

  if (frameType === 1 && payload.length >= 3) {
    const sats = payload[1];
    const bpm = payload[2];
    updateVitals({ bpm, sats });

    if (payload.length >= 5) {
      const intensity = Math.max(0, Math.min(15, Math.round(payload[4] / 7)));
      parseSignal(intensity);
    }

    return;
  }

  if (frameType === 2 && payload.length >= 2) {
    const samples = payload.slice(1);
    for (const sample of samples) {
      const graph = Math.max(0, Math.min(150, sample));
      parseGraph(graph, xAxis);
    }

    const lastSample = samples[samples.length - 1];
    const intensity = Math.max(0, Math.min(15, Math.round(lastSample / 7)));
    parseSignal(intensity);
  }
}

const isVitals = (b1, b2, b3) => b1 === 254 && b2 === 10 && b3 === 85;
const isGraph = (b1, b2, b3) => b1 === 254 && b2 === 8 && b3 === 86;

function parseVitals(arr) {
  const [bpm, sats] = arr;

  updateVitals({ bpm, sats });
}

function updateVitals({ bpm, sats }) {
  const now = timely().format('HH:mm');

  demo.sats = sats;
  demo.bpm = bpm;

  if (now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, sats, bpm], ...dataTable];
    demo.data = dataTable;
  }
}

let dir;
function parseSignal(intensity) {
  if (intensity > demo.bar) {
    dir = 'up';
  } else if (intensity < demo.bar) {
    if (dir === 'up') {
      audio('beep', true);
    }
    dir = 'down';
  }

  demo.bar = intensity;
}

function parseGraph(graph, x) {
  demo.beep = graph / 150;

  const height = graph;

  yAxis = demo.drawLine(x, yAxis, height);
  xAxis++;

  if (xAxis > 255) {
    xAxis = yAxis = 0;
  }
}
