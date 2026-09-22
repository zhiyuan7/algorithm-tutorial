param(
  [Parameter(Position = 0)]
  [ValidateSet('dev', 'dev:demo', 'build', 'build:demo', 'typecheck', 'export:png', 'export:pptx', 'export:pptx-editable')]
  [string]$Task = 'dev'
)

$runtimeNodeDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$runtimeOverrideDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\override'
$runtimeFallbackDir = 'C:\Users\HP\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback'

if (Test-Path -LiteralPath (Join-Path $runtimeNodeDir 'node.exe')) {
  $env:Path = "$runtimeNodeDir;$runtimeOverrideDir;$runtimeFallbackDir;$env:Path"
}

$nodeVersion = (& node --version 2>$null)
if (-not $nodeVersion) {
  throw 'Node.js is required. Install Node.js 22.12 or newer.'
}

$major = [int](($nodeVersion -replace '^v', '').Split('.')[0])
$minor = [int](($nodeVersion -replace '^v', '').Split('.')[1])
if ($major -lt 22 -or ($major -eq 22 -and $minor -lt 12)) {
  throw "Slidev requires Node.js 22.12 or newer. Current version: $nodeVersion"
}

$env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
& pnpm run $Task
exit $LASTEXITCODE
