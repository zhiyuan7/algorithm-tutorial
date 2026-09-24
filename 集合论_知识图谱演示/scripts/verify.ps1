$ErrorActionPreference = 'Stop'
$scriptPath = Join-Path $PSScriptRoot 'run.ps1'

& $scriptPath typecheck
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $scriptPath build
exit $LASTEXITCODE
