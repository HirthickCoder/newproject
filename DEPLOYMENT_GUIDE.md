# GitHub & Azure Deployment Guide

This guide will help you push your React application to GitHub using an API key and deploy it to Azure Static Web Apps.

## Prerequisites

### 1. Install Git
- Download and install Git from: https://git-scm.com/download/win
- After installation, restart PowerShell/Command Prompt
- Verify installation: `git --version`

### 2. Install Azure CLI (for Azure deployment)
- Download and install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows
- Verify installation: `az --version`

### 3. Install Node.js (if not already installed)
- Download from: https://nodejs.org/
- Verify installation: `node --version`

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub.com and log in
2. Click your profile picture → **Settings**
3. Scroll down and click **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Configure your token:
   - **Note**: `My React App Token`
   - **Expiration**: Choose duration (recommend 90 days)
   - **Select scopes**: Check `repo` (this gives full control of private repositories)
7. Click **Generate token**
8. **IMPORTANT**: Copy the token immediately (you won't be able to see it again!)

### Step 2: Create GitHub Repository

1. Go to GitHub.com
2. Click the **+** icon (top right) → **New repository**
3. Configure repository:
   - **Repository name**: `my-restaurant-app` (or your preferred name)
   - **Visibility**: Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
4. Click **Create repository**
5. Copy the repository URL (e.g., `https://github.com/username/my-restaurant-app.git`)

### Step 3: Push Code to GitHub

Open PowerShell in your project directory and run:

```powershell
.\push-to-github.ps1 -Token "YOUR_GITHUB_TOKEN" -RepoUrl "https://github.com/USERNAME/REPO-NAME.git"
```

**Example:**
```powershell
.\push-to-github.ps1 -Token "ghp_1234567890abcdefghijklmnopqrstuvwxyz" -RepoUrl "https://github.com/johndoe/my-restaurant-app.git"
```

The script will:
- Initialize Git repository
- Add all files
- Commit changes
- Push to GitHub

---

## Part 2: Deploy to Azure

### Option A: Automated Deployment (Recommended)

#### Step 1: Run Azure Deployment Script

```powershell
.\deploy-azure.ps1 -ResourceGroup "my-restaurant-rg" -AppName "my-restaurant-app" -Location "eastus"
```

This script will:
- Login to Azure
- Create a resource group
- Create an Azure Static Web App
- Provide deployment token

#### Step 2: Configure GitHub Actions

1. Copy the deployment token from the script output
2. Go to your GitHub repository
3. Click **Settings** → **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
6. Value: Paste the deployment token
7. Click **Add secret**

#### Step 3: Update GitHub Workflow

Edit `.github/workflows/azure-static-web-apps.yml` and ensure it's configured correctly (already done).

#### Step 4: Trigger Deployment

Push any change to GitHub:
```powershell
git add .
git commit -m "Trigger Azure deployment"
git push origin main
```

The GitHub Action will automatically deploy to Azure!

---

### Option B: Manual Azure Portal Deployment

#### Step 1: Create Static Web App

1. Go to [Azure Portal](https://portal.azure.com/)
2. Click **Create a resource**
3. Search for **Static Web App** and click **Create**
4. Configure:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or select existing
   - **Name**: `my-restaurant-app`
   - **Plan type**: Free
   - **Region**: Choose closest to your users
   - **Deployment details**:
     - **Source**: GitHub
     - Authorize GitHub access
     - **Organization**: Your GitHub username
     - **Repository**: Select your repository
     - **Branch**: main
   - **Build Details**:
     - **Build Presets**: React
     - **App location**: `/`
     - **Api location**: `server`
     - **Output location**: `dist`
5. Click **Review + Create** → **Create**

#### Step 2: Wait for Deployment

- Azure will automatically create a GitHub Action workflow
- Check the **Actions** tab in your GitHub repository
- Wait for the deployment to complete (usually 3-5 minutes)

#### Step 3: Access Your App

1. Go to Azure Portal
2. Navigate to your Static Web App resource
3. Click **Browse** to view your deployed app
4. The URL will be: `https://your-app-name.azurestaticapps.net`

---

## Environment Variables for Azure

If your app uses environment variables:

1. Go to Azure Portal → Your Static Web App
2. Click **Configuration** (left sidebar)
3. Click **Add** under Application settings
4. Add your environment variables:
   - `VITE_API_URL`
   - `VITE_STRIPE_PUBLIC_KEY`
   - etc.
5. Click **Save**

---

## Build Configuration

The app is configured to build with:

- **Build command**: `npm install && npm run build`
- **Output directory**: `dist`
- **API directory**: `server` (for backend functions)

These are already configured in `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "vite --port 3002"
  }
}
```

---

## Troubleshooting

### Git Not Installed
```
ERROR: Git is not installed
```
**Solution**: Install Git from https://git-scm.com/download/win

### Azure CLI Not Installed
```
ERROR: Azure CLI is not installed
```
**Solution**: Install from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows

### Authentication Failed
```
ERROR: Failed to push to GitHub
```
**Solution**: 
- Check your GitHub token has `repo` scope
- Ensure token hasn't expired
- Verify repository URL is correct

### Azure Deployment Failed
**Solution**:
- Check Azure Portal for error messages
- Verify build commands in workflow file
- Check GitHub Actions logs for details

---

## Quick Reference Commands

### Push to GitHub
```powershell
.\push-to-github.ps1 -Token "YOUR_TOKEN" -RepoUrl "https://github.com/USERNAME/REPO.git"
```

### Deploy to Azure
```powershell
.\deploy-azure.ps1 -AppName "my-app" -ResourceGroup "my-rg" -Location "eastus"
```

### Manual Git Commands (Alternative)
```powershell
# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Add remote with token
git remote add origin https://YOUR_TOKEN@github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main
```

---

## Security Best Practices

1. **Never commit** `.env` files with sensitive data
2. **Use Azure Key Vault** for production secrets
3. **Rotate tokens** regularly (every 90 days)
4. **Delete tokens** you no longer use
5. **Use repository secrets** for CI/CD tokens

---

## Additional Resources

- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check Azure Portal deployment logs
4. Verify all prerequisites are installed

Good luck with your deployment! 🚀
