$ErrorActionPreference = 'Stop'

pnpm install
if ($LASTEXITCODE -ne 0) { throw "pnpm install failed with exit code $LASTEXITCODE" }
pnpm run typecheck
if ($LASTEXITCODE -ne 0) { throw "Type-check failed with exit code $LASTEXITCODE" }
pnpm run build
if ($LASTEXITCODE -ne 0) { throw "Production build failed with exit code $LASTEXITCODE" }

Write-Host 'Type-check and production build passed.'
