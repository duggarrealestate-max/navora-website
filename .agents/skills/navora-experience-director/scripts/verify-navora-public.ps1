<#
.SYNOPSIS
Runs required source checks and prints the public browser-inspection inventory.
.DESCRIPTION
Does not start servers, assume a port, stop processes, install dependencies,
or edit production source. Existing npm build generates its normal build output.
Update the inventory below when authorized public routes change.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../../..'))
if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'package.json') -PathType Leaf)) {
    throw 'Repository package.json was not found relative to this skill.'
}

$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npmCommand) {
    $npmCommand = Get-Command npm -ErrorAction Stop
}

$publicRoutes = @(
    '/',
    '/solutions',
    '/industries',
    '/how-it-works',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/services (redirect to /solutions)',
    '/work (redirect to /industries)',
    '/process (redirect to /how-it-works)',
    '/* (public 404; inspect /navora-visual-qa-missing-route)'
)

Push-Location -LiteralPath $projectRoot
try {
    foreach ($checkName in @('lint', 'typecheck', 'build')) {
        Write-Output "Running npm run $checkName"
        & $npmCommand.Source run $checkName
        if ($LASTEXITCODE -ne 0) {
            throw "npm run $checkName failed with exit code $LASTEXITCODE. Verification stopped."
        }
    }

    Write-Output 'Public routes requiring Playwright visual inspection at desktop 1440x1000 and mobile 390x844:'
    foreach ($route in $publicRoutes) {
        Write-Output "  $route"
    }
    Write-Output 'Visually inspect screenshots and complete interactions, scrolling, animation cycles and reduced-motion checks.'
    Write-Output 'HTTP 200 and successful source checks are not visual approval.'
    Write-Output 'Confirm homepage and /command-centre, /retailer and /discovery remain unchanged.'
}
finally {
    Pop-Location
}
