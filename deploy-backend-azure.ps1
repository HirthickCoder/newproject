# Deploy Backend API to Azure App Service
# This script deploys your Express API to Azure

param(
    [Parameter(Mandatory=$false)]
    [string]$AppName = "my-restaurant-api",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "my-restaurant-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus"
)

Write-Host "Azure Backend API Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Check Azure CLI
try {
    az --version | Out-Null
} catch {
    Write-Host "ERROR: Azure CLI not installed." -ForegroundColor Red
    Write-Host "Install from: https://aka.ms/installazurecliwindows" -ForegroundColor Yellow
    exit 1
}

# Login
Write-Host "`nLogging in to Azure..." -ForegroundColor Yellow
az login

# Create Resource Group (if doesn't exist)
Write-Host "`nCreating/verifying resource group..." -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

# Create App Service Plan (Free tier)
Write-Host "`nCreating App Service Plan..." -ForegroundColor Yellow
az appservice plan create `
    --name "${AppName}-plan" `
    --resource-group $ResourceGroup `
    --location $Location `
    --sku F1 `
    --is-linux

# Create Web App
Write-Host "`nCreating Web App for API..." -ForegroundColor Yellow
az webapp create `
    --name $AppName `
    --resource-group $ResourceGroup `
    --plan "${AppName}-plan" `
    --runtime "NODE:18-lts"

# Configure deployment from GitHub
Write-Host "`nConfiguring GitHub deployment..." -ForegroundColor Yellow
Write-Host "You'll need to configure this in Azure Portal or use GitHub Actions" -ForegroundColor Yellow

# Get the app URL
$appUrl = az webapp show --name $AppName --resource-group $ResourceGroup --query "defaultHostName" -o tsv

Write-Host "`n====================================" -ForegroundColor Cyan
Write-Host "Backend API Deployment Information" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "App Name: $AppName" -ForegroundColor Green
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Green
Write-Host "API URL: https://$appUrl" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables in Azure Portal" -ForegroundColor White
Write-Host "2. Set up GitHub Actions for automatic deployment" -ForegroundColor White
Write-Host "3. Update frontend to use this API URL" -ForegroundColor White
