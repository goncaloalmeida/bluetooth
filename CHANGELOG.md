# Changelog

## 2026-03-20

### Added
- Added dual-profile Bluetooth support for VTM 20F and Wellue/Viatom PO6B.
- Added Wellue/Viatom PO6B adapter flow.
- Added clearer Bluetooth UI error messages.
- Added Windows clean-start script (`scripts/start-clean.ps1`) and npm helpers (`watch:clean`, `watch:clean:reinstall`).

### Changed
- Updated Rollup configuration so production build does not start the local dev server.
- Kept HTTPS certificates optional for local development.
- Improved README with base-project credit, quick start, script usage, and troubleshooting.

### Compatibility
- Original VIATOM VTM 20F flow remains supported.
- Wellue/Viatom PO6B support added in this fork.
