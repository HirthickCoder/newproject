# GitHub Push Script with Personal Access Token
# Usage: .\push-to-github.ps1 -Token "your_github_token" -RepoUrl "https://github.com/username/repo-name.git"

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main"
)

Write-Host "Starting GitHub push process..." -ForegroundColor Green

# Check if git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "ERROR: Git is not installed. Please install Git from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Initialize git repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M $Branch
}

# Configure git user if not configured
$gitUser = git config user.name
if ([string]::IsNullOrEmpty($gitUser)) {
    Write-Host "Git user not configured. Please enter your details:" -ForegroundColor Yellow
    $userName = Read-Host "Enter your name"
    $userEmail = Read-Host "Enter your email"
    git config user.name "$userName"
    git config user.email "$userEmail"
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "Initial commit from PowerShell script"
}
git commit -m "$commitMessage"

# Add remote with token embedded in URL
Write-Host "Setting up remote repository..." -ForegroundColor Yellow
$remoteUrl = $RepoUrl -replace "https://", "https://${Token}@"
git remote remove origin 2>$null
git remote add origin $remoteUrl

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin $Branch --force
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository URL: $RepoUrl" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Failed to push to GitHub. Please check your token and repository URL." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host "`nDone! Your code is now on GitHub." -ForegroundColor Green
