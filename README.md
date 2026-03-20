# bluetooth

Bluetooth Pulse Oximeter demo web app.

## Scope

This project is a fork of the base project from anaestheticsapp and keeps the original VTM 20F flow.

Supported devices in this build:
- VIATOM Pulse Oximeter VTM 20F
- Wellue/Viatom PO6B

Notes:
- The Bluetooth picker may show other nearby devices.
- Devices other than VTM 20F and PO6B are not supported.
- PO6B units may expose either service `14839ac4...` or `6e400001...`; both are supported.

## Credits

Base project: [anaestheticsapp/bluetooth](https://github.com/anaestheticsapp/bluetooth/tree/master).
- Reference article: https://anaesthetics.app/blog/posts/2020/bluetooth/

## Requirements

- Node.js 18+ (LTS recommended)
- npm
- Chromium-based browser with Web Bluetooth support (Chrome/Edge)

## Run

1. Install dependencies:

```bash
npm install
```

2. Start (recommended clean start):

```bash
npm run watch:clean
```

3. Open `http://localhost:20001/index.html`.

4. Click Connect and select only VTM 20F or PO6B.

## Commands

Dev start without clean reset:

```bash
npm run watch
```

Production build:

```bash
npm run build
```

Clean start with reinstall:

```bash
npm run watch:clean:reinstall
```

Stop-only cleanup:

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/start-clean.ps1 -StopOnly -SkipBluetoothRestart
```

## Troubleshooting

- Close mobile apps connected to the oximeter (for example ViHealth) before scanning.
- If no device appears, run `npm run watch:clean` and retry.
- Power-cycle the oximeter before a new scan.
- Restarting `bthserv` may require an Administrator PowerShell session.
