# C-Kitchen Deployment Guide

This document outlines the CI/CD pipeline setup for the C-Kitchen project, which includes a React frontend and a .NET 8 Azure Functions API.

## Architecture Overview

- **Frontend**: React application deployed to Azure Static Web Apps
- **API**: .NET 8 Azure Functions deployed to Azure Function App (`c-kitchen`)
- **CI/CD**: GitHub Actions workflow with automated deployment

## Prerequisites

Before the CI/CD pipeline can work, ensure you have the following Azure resources and GitHub secrets configured:

### Azure Resources Required

1. **Azure Static Web App** (for frontend)
   - Resource name: `salmon-pond-07f0a8010`
   - Already configured and working

2. **Azure Function App** (for API)
   - Function App name: `c-kitchen`
   - Resource Group: `c-kitchen-rg`
   - Runtime: .NET 8 Isolated
   - Must be created and accessible via Azure CLI

3. **Azure Resource Group**
   - Contains both the Static Web App and Function App resources

### GitHub Secrets Required

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Required Secrets

1. **`AZURE_STATIC_WEB_APPS_API_TOKEN_SALMON_POND_07F0A8010`**
   - Already configured ✅
   - Used for Static Web App deployment

2. **`AZURE_CREDENTIALS`** ⚠️ **NEEDS TO BE ADDED**
   - Used for Azure CLI authentication to deploy the Function App
   - Should contain a JSON object with Azure service principal credentials

#### Setting up AZURE_CREDENTIALS

To create the `AZURE_CREDENTIALS` secret:

1. **Create a Service Principal** (if you don't have one):
   ```bash
   # Login to Azure
   az login
   
   # Get your subscription ID
   az account show --query id --output tsv
   
   # Create service principal (replace YOUR_SUBSCRIPTION_ID)
   az ad sp create-for-rbac --name "c-kitchen-deployment" \
     --role contributor \
     --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
     --sdk-auth
   ```

2. **Copy the JSON output** and add it as the `AZURE_CREDENTIALS` secret in GitHub:
   ```json
   {
     "clientId": "your-client-id",
     "clientSecret": "your-client-secret",
     "subscriptionId": "your-subscription-id",
     "tenantId": "your-tenant-id"
   }
   ```

## Deployment Workflow

The CI/CD pipeline consists of two main jobs:

### 1. API Deployment (`deploy_api`)

**Triggers**: Only on push to `main` branch

**Steps**:
1. Checkout code with submodules
2. Setup .NET 8 SDK
3. Login to Azure using service principal
4. Build and publish the .NET 8 Functions project
5. Create deployment ZIP package
6. Deploy to Azure Function App using `az functionapp deployment source config-zip`
7. Restart the Function App
8. Cleanup temporary files

### 2. Frontend Deployment (`build_and_deploy_frontend`)

**Triggers**: On push to `main` or pull requests

**Steps**:
1. Checkout code with submodules
2. Build and deploy React app to Azure Static Web Apps
3. Automatic preview deployments for pull requests

### 3. Pull Request Cleanup (`close_pull_request_job`)

**Triggers**: When pull requests are closed

**Steps**:
1. Clean up preview deployments

## Project Structure

```
c-kitchen/
├── API/                          # .NET 8 Azure Functions (submodule)
│   ├── API.csproj               # Main project file
│   ├── deploy.sh                # Local deployment script
│   └── deploy-working.sh        # Alternative deployment script
├── src/                         # React frontend source
├── .github/workflows/           # GitHub Actions workflows
│   └── azure-static-web-apps-*.yml
└── package.json                 # Frontend dependencies
```

## API Submodule

The API is maintained as a Git submodule pointing to:
- Repository: `https://github.com/elielijah321/API-Example.git`
- Local path: `./API`

### Submodule Management

```bash
# Update submodule to latest
git submodule update --remote API

# Initialize submodule after clone
git submodule update --init --recursive
```

## Manual Deployment

If you need to deploy manually:

### Frontend
```bash
# Install dependencies and build
npm install
npm run build

# Deploy using Azure CLI (if needed)
# The GitHub Actions workflow handles this automatically
```

### API
```bash
cd API
chmod +x deploy.sh
./deploy.sh
```

## Monitoring and Troubleshooting

### Checking Deployment Status

1. **GitHub Actions**: Monitor workflow runs in the Actions tab
2. **Azure Portal**: Check Function App and Static Web App deployment status
3. **Function Logs**: View logs in Azure Portal under Function App → Functions → Monitor

### Common Issues

1. **Authentication Errors**: Verify `AZURE_CREDENTIALS` secret is correct
2. **Resource Not Found**: Ensure Function App `c-kitchen` exists and is accessible
3. **Build Failures**: Check .NET version compatibility and dependencies
4. **Submodule Issues**: Ensure submodules are properly initialized

### Testing Deployments

After deployment, test your endpoints:

- **Frontend**: `https://salmon-pond-07f0a8010.azurestaticapps.net`
- **API**: `https://c-kitchen.azurewebsites.net/api/test`

## Environment Variables

### GitHub Actions Environment
- `DOTNET_VERSION`: 8.0.x
- `NODE_VERSION`: Auto-detected from package.json

### Azure Function App Settings
Configure these in the Azure Portal under Function App → Configuration:
- Any API-specific environment variables
- Connection strings
- Application settings

## Security Notes

- Service principal has contributor access to the subscription
- Secrets are stored securely in GitHub
- Function App uses managed identity when possible
- HTTPS is enforced on both frontend and API

## Next Steps

1. ✅ Add the `AZURE_CREDENTIALS` secret to GitHub
2. ✅ Test the deployment by pushing to main
3. ✅ Monitor the workflow execution
4. ✅ Verify both frontend and API are working

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Azure portal for resource status
3. Verify all secrets and credentials are current
4. Test manual deployment scripts if needed
