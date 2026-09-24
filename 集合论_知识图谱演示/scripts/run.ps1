param(
  [Parameter(Position = 0)]
  [ValidateSet('dev', 'build', 'typecheck')]
  [string]$Task = 'dev'
)

$ErrorActionPreference = 'Stop'
$nodeVersion = (& node --version 2>$null)
if (-not $nodeVersion) {
  throw 'Node.js is required. Install Node.js 22.12 or newer.'
}

$parts = ($nodeVersion -replace '^v', '').Split('.')
$major = [int]$parts[0]
$minor = [int]$parts[1]
if ($major -lt 22 -or ($major -eq 22 -and $minor -lt 12)) {
  throw "Slidev requires Node.js 22.12 or newer. Current version: $nodeVersion"
}

& pnpm run $Task
exit $LASTEXITCODE
