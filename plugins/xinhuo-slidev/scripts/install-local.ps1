param(
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

$pluginRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$skillsSource = Join-Path $pluginRoot 'skills'
$skillsTarget = Join-Path $env:USERPROFILE '.agents\skills'

New-Item -ItemType Directory -Path $skillsTarget -Force | Out-Null

foreach ($skillName in @('markdown-to-cinematic-slidev', 'slidev')) {
  $source = Join-Path $skillsSource $skillName
  $target = Join-Path $skillsTarget $skillName

  if (Test-Path -LiteralPath $target) {
    if (-not $Force) {
      throw "Skill already exists: $target. Re-run with -Force to replace it."
    }
    Remove-Item -LiteralPath $target -Recurse -Force
  }

  Copy-Item -LiteralPath $source -Destination $target -Recurse
  Write-Host "Installed skill: $skillName"
}

$codex = Get-Command codex -ErrorAction Stop
& $codex.Source mcp remove slidev-outline 2>$null
& $codex.Source mcp add slidev-outline --url 'http://localhost:3030/__mcp'
if ($LASTEXITCODE -ne 0) {
  throw 'Failed to register slidev-outline MCP.'
}

Write-Host 'Installed MCP: slidev-outline -> http://localhost:3030/__mcp'
Write-Host 'Restart Codex, start a Slidev dev server on port 3030, and open a new task.'
