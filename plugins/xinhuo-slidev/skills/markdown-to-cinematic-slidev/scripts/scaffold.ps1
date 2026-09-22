param(
  [Parameter(Mandatory = $true)]
  [string]$SourceMarkdown,

  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory,

  [string]$Title
)

$ErrorActionPreference = 'Stop'

$source = (Resolve-Path -LiteralPath $SourceMarkdown).Path
if ([System.IO.Path]::GetExtension($source) -notin @('.md', '.markdown')) {
  throw 'SourceMarkdown must be a Markdown file.'
}

$destination = [System.IO.Path]::GetFullPath($OutputDirectory)
if (Test-Path -LiteralPath $destination) {
  $existing = @(Get-ChildItem -LiteralPath $destination -Force)
  if ($existing.Count -gt 0) {
    throw "Refusing to overwrite non-empty destination: $destination"
  }
} else {
  New-Item -ItemType Directory -Path $destination | Out-Null
}

$starter = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\assets\starter')).Path
Get-ChildItem -LiteralPath $starter -Force | Copy-Item -Destination $destination -Recurse -Force

$sourceText = Get-Content -LiteralPath $source -Raw -Encoding UTF8
if ([string]::IsNullOrWhiteSpace($Title)) {
  $heading = [regex]::Match($sourceText, '(?m)^\s*#\s+(.+?)\s*$')
  $Title = if ($heading.Success) { $heading.Groups[1].Value.Trim() } else { [System.IO.Path]::GetFileNameWithoutExtension($source) }
}

$contentDir = Join-Path $destination 'content'
New-Item -ItemType Directory -Path $contentDir -Force | Out-Null
Copy-Item -LiteralPath $source -Destination (Join-Path $contentDir 'source.md')

$packageName = ([regex]::Replace($Title.ToLowerInvariant(), '[^a-z0-9]+', '-')).Trim('-')
if ([string]::IsNullOrWhiteSpace($packageName)) { $packageName = 'cinematic-slidev-deck' }

$utf8 = [System.Text.UTF8Encoding]::new($false)
foreach ($relative in @('package.json', 'slides.md')) {
  $path = Join-Path $destination $relative
  $text = [System.IO.File]::ReadAllText($path)
  $text = $text.Replace('__TITLE__', $Title).Replace('__PACKAGE_NAME__', $packageName)
  [System.IO.File]::WriteAllText($path, $text, $utf8)
}

Write-Host "Created Slidev starter: $destination"
Write-Host 'Next: model the article, implement graph data and tour states, then run scripts\run.ps1 dev.'
