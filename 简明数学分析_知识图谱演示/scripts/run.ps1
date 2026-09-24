param(
  [ValidateSet('dev', 'build', 'typecheck')]
  [string]$Task = 'dev',

  [ValidateRange(1, 65535)]
  [int]$Port = 3047
)

$ErrorActionPreference = 'Stop'

$nodeVersion = (& node --version) -replace '^v', ''
$major = [int]($nodeVersion.Split('.')[0])
if ($major -lt 22) {
  throw "Node.js 22 or newer is required. Current version: $nodeVersion"
}

if (-not (Test-Path -LiteralPath 'node_modules')) {
  pnpm install
  if ($LASTEXITCODE -ne 0) { throw "pnpm install failed with exit code $LASTEXITCODE" }
}

if ($Task -eq 'dev') {
  pnpm exec slidev slides.md --port $Port
} else {
  pnpm run $Task
}
if ($LASTEXITCODE -ne 0) { throw "$Task failed with exit code $LASTEXITCODE" }
