param(
  [Parameter(Position = 0)]
  [ValidateSet('dev', 'build', 'typecheck')]
  [string]$Task = 'dev'
)
$nodeVersion = (& node --version 2>$null)
if (-not $nodeVersion) { throw 'Node.js 22.12 or newer is required.' }
$parts = ($nodeVersion -replace '^v', '').Split('.')
if ([int]$parts[0] -lt 22 -or ([int]$parts[0] -eq 22 -and [int]$parts[1] -lt 12)) {
  throw "Node.js 22.12 or newer is required. Current version: $nodeVersion"
}
& pnpm run $Task
exit $LASTEXITCODE
