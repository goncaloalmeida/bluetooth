import { handleData } from '../adapter/viatom-20f.js';
import { createWelluePo6Session } from '../adapter/wellue-po6.js';
import { createStandardPlxSession } from '../adapter/standard-plx.js';

const DEMO_VIEW = document.body.querySelector('demo-view');
const DEBUG_BT = false;

function logInfo(...args) {
  if (DEBUG_BT) {
    console.log('[BT]', ...args);
  }
}

function logWarn(...args) {
  console.warn('[BT]', ...args);
}

function logError(...args) {
  console.error('[BT]', ...args);
}

const VIATOM_20F_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const LEGACY_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const WELLUE_PO6_SERVICE_UUID = '14839ac4-7d7e-415c-9a42-167340cf2339';
const WELLUE_PO6_NOTIFY_UUID = '0734594a-a8e7-4b1a-a6b1-cd5243059a57';
const WELLUE_PO6_WRITE_UUID = '8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3';
const STANDARD_PLX_SERVICE_UUID = '00001822-0000-1000-8000-00805f9b34fb';
const STANDARD_HEART_RATE_SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
const STANDARD_BATTERY_SERVICE_UUID = '0000180f-0000-1000-8000-00805f9b34fb';
const GENERIC_ACCESS_SERVICE_UUID = '00001800-0000-1000-8000-00805f9b34fb';
const GENERIC_ATTRIBUTE_SERVICE_UUID = '00001801-0000-1000-8000-00805f9b34fb';

const EXTRA_OPTIONAL_SERVICES = [
  '0000fff0-0000-1000-8000-00805f9b34fb',
  '0000fff1-0000-1000-8000-00805f9b34fb',
  '0000ffe1-0000-1000-8000-00805f9b34fb',
  '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
  '49535343-fe7d-4ae5-8fa9-9fafd205e455',
];

const DEVICE_FILTERS = [
  { name: 'VTM 20F' },
  { namePrefix: 'VTM' },
  { namePrefix: 'PO' },
  { namePrefix: 'POD' },
  { namePrefix: 'Wellue' },
  { namePrefix: 'Viatom' },
];

const TEXT_VALUES = new Set([
  '0000ff91',
  '0000ff96',
  '00002a26',
  '00002a27',
  '00002a00',
  '00002a29',
]);
const NUMBER_VALUES = new Set([
  '0000ff92',
  '0000ff93',
  '0000ff95',
  '0000ff97',
  '0000ff98',
  '0000ff9a',
]);

const PROFILES = [
  {
    id: 'viatom-20f',
    serviceUuid: VIATOM_20F_SERVICE_UUID,
    optionalServices: [
      '00001800-0000-1000-8000-00805f9b34fb',
      '00001801-0000-1000-8000-00805f9b34fb',
      '0000180a-0000-1000-8000-00805f9b34fb',
      '0000fd00-0000-1000-8000-00805f9b34fb',
      '0000ff90-0000-1000-8000-00805f9b34fb',
      '0000ffc0-0000-1000-8000-00805f9b34fb',
      VIATOM_20F_SERVICE_UUID,
      '0000ffe5-0000-1000-8000-00805f9b34fb',
    ],
    async connect(server) {
      const service = await server.getPrimaryService(VIATOM_20F_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();

      logInfo('VIATOM 20F characteristics found', characteristics.map((ch) => ch.uuid));

      for (const characteristic of characteristics) {
        if (characteristic.properties.notify) {
          characteristic.addEventListener('characteristicvaluechanged', handleData);
          await characteristic.startNotifications();
          logInfo('Notification started', characteristic.uuid);
        }
      }

      return {
        cleanup() {
          for (const characteristic of characteristics) {
            characteristic.removeEventListener('characteristicvaluechanged', handleData);
          }
        },
      };
    },
  },
  {
    id: 'legacy-uart-oximeter',
    serviceUuid: LEGACY_UART_SERVICE_UUID,
    optionalServices: [LEGACY_UART_SERVICE_UUID],
    async connect(server) {
      const service = await server.getPrimaryService(LEGACY_UART_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();

      logInfo('Legacy UART characteristics found', characteristics.map((ch) => ch.uuid));

      const active = [];
      for (const characteristic of characteristics) {
        if (!characteristic.properties.notify) continue;

        characteristic.addEventListener('characteristicvaluechanged', handleData);
        await characteristic.startNotifications();
        active.push(characteristic);
        logInfo('Notification started', characteristic.uuid);
      }

      if (!active.length) {
        throw new Error('Legacy UART profile found but no notifiable characteristics were available.');
      }

      return {
        cleanup() {
          for (const characteristic of active) {
            characteristic.removeEventListener('characteristicvaluechanged', handleData);
          }
        },
      };
    },
  },
  {
    id: 'wellue-po6',
    serviceUuid: WELLUE_PO6_SERVICE_UUID,
    optionalServices: [WELLUE_PO6_SERVICE_UUID],
    async connect(server) {
      const service = await server.getPrimaryService(WELLUE_PO6_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();
      logInfo('Wellue service characteristics found', characteristics.map((ch) => ch.uuid));

      const notifyCharacteristic = characteristics.find((ch) => ch.uuid === WELLUE_PO6_NOTIFY_UUID);
      const writeCharacteristic = characteristics.find((ch) => ch.uuid === WELLUE_PO6_WRITE_UUID);

      if (!notifyCharacteristic || !writeCharacteristic) {
        throw new Error(`Wellue profile missing required characteristics. Expected notify=${WELLUE_PO6_NOTIFY_UUID}, write=${WELLUE_PO6_WRITE_UUID}`);
      }

      const wellueSession = createWelluePo6Session(writeCharacteristic);

      notifyCharacteristic.addEventListener('characteristicvaluechanged', wellueSession.handleData);
      await notifyCharacteristic.startNotifications();
      logInfo('Notification started', notifyCharacteristic.uuid);
      await wellueSession.start();
      logInfo('Wellue session started');

      return {
        cleanup() {
          wellueSession.cleanup();
          notifyCharacteristic.removeEventListener('characteristicvaluechanged', wellueSession.handleData);
        },
      };
    },
  },
  {
    id: 'standard-plx',
    serviceUuid: STANDARD_PLX_SERVICE_UUID,
    optionalServices: [
      STANDARD_PLX_SERVICE_UUID,
      STANDARD_HEART_RATE_SERVICE_UUID,
      STANDARD_BATTERY_SERVICE_UUID,
    ],
    async connect(server) {
      const sessionStandard = createStandardPlxSession();
      const candidates = [
        STANDARD_PLX_SERVICE_UUID,
        STANDARD_HEART_RATE_SERVICE_UUID,
      ];

      const active = [];
      for (const serviceUuid of candidates) {
        let service;
        try {
          service = await server.getPrimaryService(serviceUuid);
        } catch (err) {
          continue;
        }

        const characteristics = await service.getCharacteristics();
        logInfo('Standard service characteristics found', serviceUuid, characteristics.map((ch) => ch.uuid));

        for (const characteristic of characteristics) {
          if (!characteristic.properties.notify) continue;

          const handler = (e) => sessionStandard.handleData(characteristic.uuid, e.target.value);
          characteristic.addEventListener('characteristicvaluechanged', handler);
          await characteristic.startNotifications();
          logInfo('Notification started', characteristic.uuid);
          active.push({ characteristic, handler });
        }
      }

      if (!active.length) {
        throw new Error('Standard PLX profile found but no notifiable characteristics were available.');
      }

      return {
        cleanup() {
          sessionStandard.cleanup();
          for (const { characteristic, handler } of active) {
            characteristic.removeEventListener('characteristicvaluechanged', handler);
          }
        },
      };
    },
  },
];

let device = null;
let session = null;

async function probeProfile(server) {
  for (const candidate of PROFILES) {
    try {
      await server.getPrimaryService(candidate.serviceUuid);
      return candidate;
    } catch (err) {
      // Keep probing known profile UUIDs.
    }
  }

  return null;
}

async function toggleConnection() {
  try {
    if (device?.gatt?.connected) {
      logInfo('Disconnecting device', device.name || device.id || 'unknown');
      session?.cleanup();
      device.gatt.disconnect();
    } else {
      await connect();
    }
    return !!device?.gatt?.connected;
  } catch (err) {
    logError('toggleConnection failed', err);
    throw err;
  }
}

async function connect() {
  logInfo('Requesting bluetooth device...');

  const optionalServices = [...new Set([
    ...PROFILES.flatMap((profile) => profile.optionalServices),
    ...EXTRA_OPTIONAL_SERVICES,
  ])];

  try {
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices,
    });
  } catch (err) {
    if (err?.name !== 'NotFoundError') {
      throw err;
    }

    logWarn('Unfiltered scan found no selectable device. Retrying with known-name filters.');
    device = await navigator.bluetooth.requestDevice({
      filters: DEVICE_FILTERS,
      optionalServices,
    });
  }

  logInfo('Device selected', { name: device.name || 'unknown device', id: device.id || 'n/a' });

  const server = await device.gatt.connect();
  logInfo('GATT connected');
  const decoder = new TextDecoder('utf-8');

  const services = await server.getPrimaryServices();
  const serviceIds = new Set(services.map((service) => service.uuid));
  logInfo('Detected services', [...serviceIds]);
  let profile = PROFILES.find((candidate) => serviceIds.has(candidate.serviceUuid));

  if (!profile) {
    profile = await probeProfile(server);
    if (profile) {
      logWarn('Profile recovered by direct UUID probe', profile.id);
    }
  }

  if (!profile) {
    const hasOnlyGenericServices = serviceIds.size === 2
      && serviceIds.has(GENERIC_ACCESS_SERVICE_UUID)
      && serviceIds.has(GENERIC_ATTRIBUTE_SERVICE_UUID);

    if (hasOnlyGenericServices) {
      throw new Error('Unsupported device. Only generic BLE services (1800/1801) are visible. This build officially supports only VTM 20F and Wellue/Viatom PO6B. Usually this means the oximeter is not in the correct mode, is connected to another app, or a different nearby device was selected.');
    }

    throw new Error(`Unsupported device. This build officially supports only VTM 20F and Wellue/Viatom PO6B. Detected services: ${[...serviceIds].join(', ')}. If this is your oximeter, it may expose a different service UUID or still be connected to another app.`);
  }

  logInfo(`Using profile ${profile.id}`);

  if (DEBUG_BT) {
    for (const s of services) {
      const characteristics = await s.getCharacteristics();

      console.group(`service ${s.uuid}`);

      for (const characteristic of characteristics) {
        const [uuid] = characteristic.uuid.split('-');

        const availableProps = [];
        for (const key of ['authenticatedSignedWrites', 'broadcast', 'indicate', 'notify', 'read', 'reliableWrite', 'writableAuxiliaries', 'write', 'writeWithoutResponse']) {
          if (characteristic.properties[key]) availableProps.push(key);
        }

        let description;
        try {
          const descriptor = await characteristic.getDescriptor('gatt.characteristic_user_description');
          const value = await descriptor.readValue();
          description = decoder.decode(value).replaceAll('\x00', '');
        } catch (err) {
          // no descriptor
        }

        if (characteristic.properties.read) {
          let read;
          try {
            read = await characteristic.readValue();
          } catch (err) {
            logWarn('Read failed for characteristic', characteristic.uuid, err);
            continue;
          }

          let value;
          if (TEXT_VALUES.has(uuid)) {
            value = decoder.decode(read).replaceAll('\x00', '');
          } else if (NUMBER_VALUES.has(uuid)) {
            value = [];
            for (let i = 0; i < read.byteLength; i++) {
              value.push(read.getUint8(i));
            }
          } else {
            const data = [];
            for (let i = 0; i < read.byteLength; i++) {
              data.push(read.getUint8(i));
            }
            value = ['unknown', data, decoder.decode(read)];
          }

          console.log({ uuid, description, value }, availableProps);
        } else {
          console.log({ uuid, description }, availableProps);
        }
      }

      console.groupEnd();
    }
  }

  session = await profile.connect(server);
  logInfo('Profile session ready');
  device.addEventListener('gattserverdisconnected', onDisconnected);
}

function onDisconnected(e) {
  const t = e.target;
  logWarn('Device disconnected', t.name || t.id || 'unknown');
  session?.cleanup();
  session = null;
  device = null;
  DEMO_VIEW.disconnected();
}

export default toggleConnection;
