$ErrorActionPreference = 'Stop'
$scriptPath = Join-Path $PSScriptRoot 'run.ps1'

& $scriptPath typecheck
if ($LASTEXITCODE -ne 0) { throw "Type-check failed with exit code $LASTEXITCODE" }
& $scriptPath build
if ($LASTEXITCODE -ne 0) { throw "Production build failed with exit code $LASTEXITCODE" }

Write-Host 'Type-check and production build passed.'
