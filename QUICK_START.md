# Quick Start Guide - GitHub & Azure Deployment

## ⚡ Prerequisites Setup (First Time Only)

### 1. Install Git
```powershell
# Download and install from:
https://git-scm.com/download/win

# After installation, verify:
git --version
```

### 2. Install Azure CLI (Optional - for Azure deployment)
```powershell
# Download from:
https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows

# After installation, verify:
az --version
```

---

## 🚀 Push to GitHub (2 Simple Steps)

### Step 1: Get GitHub Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `My React App`
4. Select scope: **✓ repo** (full control)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Run the Script
```powershell
# Replace YOUR_TOKEN and USERNAME/REPO with your actual values
.\push-to-github.ps1 -Token "ghp_YOUR_TOKEN_HERE" -RepoUrl "https://github.com/USERNAME/REPO-NAME.git"
```

**Example:**
```powershell
.\push-to-github.ps1 -Token "ghp_abc123xyz789" -RepoUrl "https://github.com/johndoe/my-restaurant-app.git"
```

✅ Done! Your code is now on GitHub.

---

## ☁️ Deploy to Azure (Automatic Method)

### Step 1: Deploy to Azure
```powershell
.\deploy-azure.ps1 -AppName "my-restaurant-app" -ResourceGroup "my-restaurant-rg" -Location "eastus"
```

This will:
- Login to Azure (browser will open)
- Create resources
- Give you a **deployment token**

### Step 2: Add Token to GitHub
1. Copy the deployment token from PowerShell
2. Go to: `https://github.com/USERNAME/REPO/settings/secrets/actions`
3. Click **"New repository secret"**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the token
6. Click **"Add secret"**

### Step 3: Push to GitHub to Deploy
```powershell
# Any push to GitHub will now automatically deploy to Azure!
git add .
git commit -m "Deploy to Azure"
git push origin main
```

✅ Done! Your app will be live at: `https://your-app-name.azurestaticapps.net`

---

## 📝 Common Commands

### Update GitHub
```powershell
git add .
git commit -m "Your message here"
git push origin main
```

### Check Deployment Status
- GitHub: `https://github.com/USERNAME/REPO/actions`
- Azure: `https://portal.azure.com`

---

## ❗ Troubleshooting

**"Git not recognized"**
→ Install Git and restart PowerShell

**"Azure CLI not recognized"**
→ Install Azure CLI and restart PowerShell

**"Authentication failed"**
→ Check your token has 'repo' permissions
→ Make sure token hasn't expired

**"Deployment failed"**
→ Check GitHub Actions tab for logs
→ Check Azure Portal for error messages

---

## 📚 Need More Details?

See **DEPLOYMENT_GUIDE.md** for comprehensive instructions.

---

## 🎯 Locations Available for Azure

Choose a location close to your users:
- **eastus** (East US)
- **westus2** (West US 2)
- **centralus** (Central US)
- **westeurope** (West Europe)
- **eastasia** (East Asia)
- **southeastasia** (Southeast Asia)

---

Happy Deploying! 🎉
