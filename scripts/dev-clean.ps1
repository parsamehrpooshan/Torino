$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

# Stop only listeners owned by port 3000; do not touch unrelated Node processes.
# netstat is used as a fallback because Get-NetTCPConnection can omit IPv4
# listeners when the shell is not elevated.
$listeners = @(
  Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess
  netstat -ano -p tcp | ForEach-Object {
    if ($_ -match '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)') { $Matches[1] }
  }
) | Sort-Object -Unique

foreach ($processId in $listeners) {
  Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
}

if (Test-Path -LiteralPath ".next") {
  Remove-Item -LiteralPath ".next" -Recurse -Force
}

npm run dev -- --port 3000
