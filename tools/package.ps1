param(
  [switch]$Clean
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path -LiteralPath (Join-Path $scriptDir '..')
$packs = Join-Path $root 'packs'
$dist = Join-Path $root 'dist'
$bp = Join-Path $packs 'AdventureHelpersBP'
$rp = Join-Path $packs 'AdventureHelpersRP'

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Assert-ChildPath {
  param(
    [string]$Parent,
    [string]$Child
  )
  $parentPath = [System.IO.Path]::GetFullPath($Parent).TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
  $childPath = [System.IO.Path]::GetFullPath($Child)
  if (-not $childPath.StartsWith($parentPath, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Path is outside intended directory: $Child"
  }
}

function To-ZipPath {
  param([string]$PathText)
  return $PathText.Replace([string][char]92, '/')
}

function New-BedrockZip {
  param(
    [string]$SourceDir,
    [string]$Destination
  )

  $source = (Resolve-Path -LiteralPath $SourceDir).Path
  $dest = [System.IO.Path]::GetFullPath($Destination)
  Assert-ChildPath -Parent $dist -Child $dest
  if ([System.IO.File]::Exists($dest)) {
    [System.IO.File]::Delete($dest)
  }

  $zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    Get-ChildItem -LiteralPath $source -Recurse -File | ForEach-Object {
      $relative = $_.FullName.Substring($source.Length).TrimStart([char]92)
      $relative = To-ZipPath $relative
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
  } finally {
    $zip.Dispose()
  }
}

function New-McAddon {
  param(
    [string]$BehaviorDir,
    [string]$ResourceDir,
    [string]$Destination
  )

  $behavior = (Resolve-Path -LiteralPath $BehaviorDir).Path
  $resource = (Resolve-Path -LiteralPath $ResourceDir).Path
  $dest = [System.IO.Path]::GetFullPath($Destination)
  Assert-ChildPath -Parent $dist -Child $dest
  if ([System.IO.File]::Exists($dest)) {
    [System.IO.File]::Delete($dest)
  }

  $zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($pair in @(@($behavior, 'AdventureHelpersBP'), @($resource, 'AdventureHelpersRP'))) {
      Get-ChildItem -LiteralPath $pair[0] -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($pair[0].Length).TrimStart([char]92)
        $relative = To-ZipPath $relative
        $entry = $pair[1] + '/' + $relative
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
      }
    }
  } finally {
    $zip.Dispose()
  }
}

New-Item -ItemType Directory -Force -Path $dist | Out-Null

if ($Clean) {
  $distFull = [System.IO.Path]::GetFullPath($dist)
  Get-ChildItem -LiteralPath $distFull -File | Where-Object { $_.Name -ne '.gitkeep' } | ForEach-Object {
    Assert-ChildPath -Parent $distFull -Child $_.FullName
    Remove-Item -LiteralPath $_.FullName -Force
  }
}

Get-Content -LiteralPath (Join-Path $bp 'manifest.json') -Raw | ConvertFrom-Json | Out-Null
Get-Content -LiteralPath (Join-Path $rp 'manifest.json') -Raw | ConvertFrom-Json | Out-Null

New-BedrockZip -SourceDir $bp -Destination (Join-Path $dist 'AdventureHelpersBP.mcpack')
New-BedrockZip -SourceDir $rp -Destination (Join-Path $dist 'AdventureHelpersRP.mcpack')
New-McAddon -BehaviorDir $bp -ResourceDir $rp -Destination (Join-Path $dist 'AdventureHelpers.mcaddon')

Write-Output "Built Adventure Helpers packs in $dist"
