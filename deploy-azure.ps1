# Azure Deployment Script
# This script helps deploy your React app to Azure Static Web Apps

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "my-restaurant-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "my-restaurant-app",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus"
)

Write-Host "Azure Static Web App Deployment Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
try {
    az --version | Out-Null
} catch {
    Write-Host "ERROR: Azure CLI is not installed." -ForegroundColor Red
    Write-Host "Please install Azure CLI from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows" -ForegroundColor Yellow
    exit 1
}

Write-Host "Azure CLI is installed." -ForegroundColor Green

# Login to Azure
Write-Host "`nLogging in to Azure..." -ForegroundColor Yellow
az login

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Azure login failed." -ForegroundColor Red
    exit 1
}

Write-Host "Successfully logged in to Azure." -ForegroundColor Green

# Create Resource Group
Write-Host "`nCreating resource group: $ResourceGroup..." -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Resource group may already exist." -ForegroundColor Yellow
}

# Create Static Web App
Write-Host "`nCreating Azure Static Web App: $AppName..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

az staticwebapp create `
    --name $AppName `
    --resource-group $ResourceGroup `
    --location $Location `
    --source "https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME" `
    --branch main `
    --app-location "/" `
    --api-location "server" `
    --output-location "dist"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create Static Web App." -ForegroundColor Red
    Write-Host "You may need to configure the GitHub repository URL manually." -ForegroundColor Yellow
    exit 1
}

# Get deployment token
Write-Host "`nRetrieving deployment token..." -ForegroundColor Yellow
$deploymentToken = az staticwebapp secrets list --name $AppName --resource-group $ResourceGroup --query "properties.apiKey" -o tsv

Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "Deployment Information" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "App Name: $AppName" -ForegroundColor Green
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Green
Write-Host "Location: $Location" -ForegroundColor Green
Write-Host "`nDeployment Token (save this for GitHub Actions):" -ForegroundColor Yellow
Write-Host $deploymentToken -ForegroundColor Cyan
Write-Host "`n=======================================" -ForegroundColor Cyan

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Add the deployment token as a GitHub Secret named 'AZURE_STATIC_WEB_APPS_API_TOKEN'" -ForegroundColor White
Write-Host "2. Push your code to GitHub to trigger automatic deployment" -ForegroundColor White
Write-Host "3. Visit Azure Portal to view your deployed app" -ForegroundColor White

# Get the app URL
$appUrl = az staticwebapp show --name $AppName --resource-group $ResourceGroup --query "defaultHostname" -o tsv
Write-Host "`nYour app will be available at: https://$appUrl" -ForegroundColor Green
