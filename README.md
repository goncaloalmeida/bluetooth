# bluetooth

Bluetooth Pulse Oximeter demo web app.

## Credits

Base project: [anaestheticsapp/bluetooth](https://github.com/anaestheticsapp/bluetooth/tree/master).

Original project/author credits are preserved:
- Simon Bluhm
- Original concept and implementation: Bluetooth pulse oximeter web demo
- Reference article: https://anaesthetics.app/blog/posts/2020/bluetooth/

## Fork Highlights

- Multi-profile Bluetooth support.
- Legacy UART parser support for devices exposing service `6e400001-b5a3-f393-e0a9-e50e24dcca9e`.
- Wellue/Viatom PO6 custom service support.
- Standard BLE Pulse Oximeter/Heart Rate fallback support.
- Better Bluetooth connection error handling in the UI.
- Clean reset/start script for Windows (`watch:clean`).

## Supported Device Families

- VIATOM Pulse Oximeter VTM 20F (original parser and graph flow).
- Legacy UART-compatible oximeters exposing `6e400001...`.
- Wellue/Viatom PO6 family (live SpO2 and HR values).
- Standard BLE PLX/HR compatible devices (fallback profile).

## Requirements

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)
- Chromium-based browser with Web Bluetooth support (Chrome/Edge)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start with clean reset (recommended):

```bash
npm run watch:clean
```

3. Open:

`http://localhost:20001/index.html`

4. Click **Connect** and select your oximeter.

## Useful Commands

Start dev server without clean reset:

```bash
npm run watch
```

Create production build:

```bash
npm run build
```

Clean reset + reinstall dependencies + start:

```bash
npm run watch:clean:reinstall
```

Stop stale processes/port only (without starting watch):

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/start-clean.ps1 -StopOnly -SkipBluetoothRestart
```

## Troubleshooting

- If no device appears, there may be an active Bluetooth session.
- Disconnect in this app and close other apps using the same oximeter (for example ViHealth/mobile app).
- Use `npm run watch:clean` to force-close Node and port `20001` before retrying.
- If needed, remove Bluetooth permission for localhost in browser settings and power-cycle the oximeter.
- If PowerShell blocks script execution, run with `-ExecutionPolicy Bypass` as shown above.
- Restarting `bthserv` may require an Administrator PowerShell session.

## Notes

- This fork keeps compatibility with both original VTM flow and newer/alternative BLE profiles.
- PO6 profile provides live values; waveform availability depends on device/protocol.
- Production build output is generated in `public/`.
