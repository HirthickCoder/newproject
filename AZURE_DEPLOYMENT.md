# Azure Deployment Guide - Full Stack App

Your app has both **Frontend (React)** and **Backend (Express API)**. Here's how to deploy both to Azure.

---

## 📋 Architecture

- **Frontend**: Azure Static Web Apps
- **Backend API**: Azure App Service (Node.js)
- **Database**: Azure Database for PostgreSQL (or keep your current DB)

---

## 🚀 Step-by-Step Deployment

### **Part 1: Deploy Frontend (React App)**

#### **1. Create Static Web App in Azure Portal**

1. Go to: **https://portal.azure.com**
2. Click **"+ Create a resource"**
3. Search **"Static Web App"** → Click **"Create"**

#### **2. Configure Frontend**

**Basics:**
- **Subscription**: Your Azure subscription
- **Resource Group**: Create new → `my-restaurant-rg`
- **Static Web App details**:
  - **Name**: `my-restaurant-frontend`
  - **Plan type**: **Free**
  - **Region**: **East US 2**

**Deployment details:**
- **Source**: **GitHub**
- Click **"Sign in with GitHub"**
- **Organization**: `HirthickCoder`
- **Repository**: `my-restaurant-app`
- **Branch**: `main`

**Build Details:**
- **Build Presets**: **React**
- **App location**: `/`
- **Api location**: **(Leave EMPTY)**
- **Output location**: `dist`

#### **3. Create**
- Click **"Review + create"**
- Click **"Create"**
- Wait 5-10 minutes for deployment

---

### **Part 2: Deploy Backend API**

#### **Option A: Using Azure Portal**

1. **Create App Service**
   - In Azure Portal, click **"+ Create a resource"**
   - Search **"Web App"** → **Create**

2. **Configure:**
   - **Resource Group**: Select `my-restaurant-rg`
   - **Name**: `my-restaurant-api` (must be globally unique)
   - **Publish**: **Code**
   - **Runtime stack**: **Node 18 LTS**
   - **Operating System**: **Linux**
   - **Region**: **East US**
   - **Pricing plan**: 
     - Click "Create new"
     - Select **F1 (Free)** tier
   
3. **Click "Review + create"** → **"Create"**

4. **Configure Deployment**
   - Go to your Web App resource
   - Click **"Deployment Center"** (left sidebar)
   - **Source**: GitHub
   - Sign in and select:
     - **Organization**: HirthickCoder
     - **Repository**: my-restaurant-app
     - **Branch**: main
   - **Build**: 
     - **Runtime stack**: Node
     - **Version**: 18 LTS
     - **Build command**: `cd server && npm install`
     - **Start command**: `cd server && node server.js`
   - Click **"Save"**

#### **Option B: Using PowerShell Script**

```powershell
cd C:\Users\Hirthick\Music\my-react-app
.\deploy-backend-azure.ps1 -AppName "my-restaurant-api"
```

---

### **Part 3: Configure Environment Variables**

#### **For Backend API (App Service)**

1. Go to your **App Service** (`my-restaurant-api`)
2. Click **"Configuration"** → **"Application settings"**
3. Click **"+ New application setting"** for each:

```
DATABASE_URL = your_postgresql_connection_string
PORT = 8080
STRIPE_SECRET_KEY = your_stripe_secret_key
NODE_ENV = production
```

4. Click **"Save"**

#### **For Frontend (Static Web App)**

1. Go to your **Static Web App** (`my-restaurant-frontend`)
2. Click **"Configuration"**
3. Add environment variables:

```
VITE_API_URL = https://my-restaurant-api.azurewebsites.net
VITE_STRIPE_PUBLIC_KEY = your_stripe_public_key
```

4. Click **"Save"**

---

### **Part 4: Set Up GitHub Actions**

#### **Backend Deployment**

1. Get publish profile from App Service:
   - Go to your App Service
   - Click **"Get publish profile"** (top menu)
   - Download the file

2. Add to GitHub Secrets:
   - Go to: `https://github.com/HirthickCoder/my-restaurant-app/settings/secrets/actions`
   - Click **"New repository secret"**
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Paste entire content of publish profile file
   - Click **"Add secret"**

3. The workflow file is already created at `.github/workflows/deploy-backend.yml`

#### **Frontend Deployment**

This is automatically configured when you create the Static Web App!

---

## 🔐 Database Configuration

### **Option 1: Use Azure Database for PostgreSQL**

1. Create PostgreSQL server:
   ```powershell
   az postgres flexible-server create `
     --name my-restaurant-db `
     --resource-group my-restaurant-rg `
     --location eastus `
     --admin-user dbadmin `
     --admin-password YourSecurePassword123! `
     --sku-name Standard_B1ms `
     --tier Burstable `
     --public-access 0.0.0.0-255.255.255.255
   ```

2. Get connection string and add to App Service configuration

### **Option 2: Keep Your Current Database**

Make sure your current database allows connections from Azure:
- Add Azure App Service IPs to your database firewall

---

## 📝 Update CORS Settings

In your `server/server.js` or backend code, update CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://my-restaurant-frontend.azurestaticapps.net',
    'http://localhost:3002' // for local development
  ],
  credentials: true
}));
```

---

## ✅ Testing Your Deployment

### **Frontend**
Visit: `https://my-restaurant-frontend.azurestaticapps.net`

### **Backend API**
Test: `https://my-restaurant-api.azurewebsites.net/api/health`

---

## 🔄 Continuous Deployment

Now when you push to GitHub:
1. Frontend automatically deploys via Azure Static Web Apps
2. Backend automatically deploys via GitHub Actions

Just run:
```powershell
git add .
git commit -m "Update app"
git push origin main
```

---

## 📊 Monitor Your App

### **View Logs**

**Backend:**
1. Go to App Service
2. Click **"Log stream"** to see real-time logs

**Frontend:**
1. Go to Static Web App
2. Click **"Functions"** → **"Logs"**

### **Check Deployment Status**

GitHub Actions: `https://github.com/HirthickCoder/my-restaurant-app/actions`

---

## 💰 Cost Estimate

- **Static Web App (Frontend)**: **FREE**
- **App Service F1 (Backend)**: **FREE**
- **Total**: **$0/month** (Free tier limits apply)

---

## 🆘 Troubleshooting

### API Not Connecting
- Check CORS settings in backend
- Verify `VITE_API_URL` in frontend config
- Check firewall rules on database

### Build Failures
- Check GitHub Actions logs
- Verify `package.json` has all dependencies
- Check Node.js version compatibility

### Database Connection Issues
- Verify connection string
- Check firewall rules
- Ensure SSL is configured if required

---

## 📚 Next Steps

1. ✅ Deploy frontend to Static Web Apps
2. ✅ Deploy backend to App Service
3. ✅ Configure environment variables
4. ✅ Set up database connection
5. ✅ Test the deployed application
6. ✅ Set up custom domain (optional)

---

Good luck with your deployment! 🚀
