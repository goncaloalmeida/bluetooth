param(
  [switch]$Reinstall,
  [switch]$SkipBluetoothRestart,
  [switch]$StopOnly
)

$ErrorActionPreference = 'Stop'

function Write-Step {
  param([string]$Message)
  Write-Host "[clean-start] $Message"
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Step "Repository: $repoRoot"

# Ensure npm is available in fresh PowerShell sessions.
$env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'User')

Write-Step "Stopping listeners on port 20001"
$connections = Get-NetTCPConnection -LocalPort 20001 -State Listen -ErrorAction SilentlyContinue
foreach ($conn in $connections) {
  try {
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction Stop
    Write-Step "Stopped PID $($conn.OwningProcess)"
  } catch {
    Write-Step "Could not stop PID $($conn.OwningProcess): $($_.Exception.Message)"
  }
}

Write-Step "Stopping Node.js processes"
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
  try {
    Stop-Process -Id $_.Id -Force -ErrorAction Stop
    Write-Step "Stopped node PID $($_.Id)"
  } catch {
    Write-Step "Could not stop node PID $($_.Id): $($_.Exception.Message)"
  }
}

if (-not $SkipBluetoothRestart) {
  Write-Step "Restarting Windows Bluetooth service (bthserv)"
  try {
    Restart-Service bthserv -Force -ErrorAction Stop
    Start-Sleep -Seconds 2
    Write-Step "Bluetooth service restarted"
  } catch {
    Write-Step "Could not restart bthserv (try running PowerShell as Administrator): $($_.Exception.Message)"
  }
} else {
  Write-Step "Skipping Bluetooth service restart"
}

if ($Reinstall) {
  Write-Step "Reinstall requested: removing node_modules and running npm ci"
  if (Test-Path node_modules) {
    Remove-Item node_modules -Recurse -Force
  }
  npm.cmd ci
}

if ($StopOnly) {
  Write-Step "Stop-only mode complete"
  exit 0
}

Write-Step "Starting development server"
npm.cmd run watch
