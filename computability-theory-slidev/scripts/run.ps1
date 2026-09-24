param(
  [ValidateSet('dev', 'build', 'typecheck')]
  [string]$Task = 'dev',

  [ValidateRange(1, 65535)]
  [int]$Port = 3030
)

$ErrorActionPreference = 'Stop'

$runtimeNodeDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$runtimeOverrideDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\override'
$runtimeFallbackDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback'

if (Test-Path -LiteralPath (Join-Path $runtimeNodeDir 'node.exe')) {
  $env:Path = "$runtimeNodeDir;$runtimeOverrideDir;$runtimeFallbackDir;$env:Path"
}

$nodeVersion = (& node --version) -replace '^v', ''
$major = [int]($nodeVersion.Split('.')[0])
$minor = [int]($nodeVersion.Split('.')[1])
if ($major -lt 22 -or ($major -eq 22 -and $minor -lt 12)) {
  throw "Slidev requires Node.js 22.12 or newer. Current version: $nodeVersion"
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
