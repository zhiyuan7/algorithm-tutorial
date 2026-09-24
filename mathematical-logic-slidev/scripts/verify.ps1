$ErrorActionPreference = 'Stop'
$scriptPath = Join-Path $PSScriptRoot 'run.ps1'

& $scriptPath typecheck
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $scriptPath build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host 'Type-check and production build passed.'
