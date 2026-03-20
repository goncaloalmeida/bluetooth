# Changelog

## 2026-03-20

### Added
- Added multi-profile Bluetooth detection and connection flow.
- Added support for legacy UART oximeter devices (`6e400001-b5a3-f393-e0a9-e50e24dcca9e`).
- Added Wellue/Viatom PO6 adapter.
- Added standard BLE PLX/HR adapter fallback.
- Added clearer Bluetooth UI error messages.
- Added Windows clean-start script (`scripts/start-clean.ps1`) and npm helpers (`watch:clean`, `watch:clean:reinstall`).

### Changed
- Updated Rollup configuration so production build does not start the local dev server.
- Kept HTTPS certificates optional for local development.
- Improved README with base-project credit, quick start, script usage, and troubleshooting.

### Compatibility
- Original VIATOM VTM 20F flow remains supported.
- Extended compatibility to additional BLE profile families.
