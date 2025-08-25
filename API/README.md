# API-Example

A .NET 8 Azure Functions API example project with isolated worker model.

## Project Overview

This is a sample Azure Functions application built with:
- .NET 8
- Azure Functions v4
- Isolated worker model
- Simple test endpoint at `/api/test`

## Prerequisites

Before deploying, ensure you have the following installed and configured:

### Required Tools
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure subscription with an existing Function App

### Azure CLI Authentication
```bash
# Login to Azure
az login

# Verify you're logged in and have access to your subscription
az account show
```

## Deployment

This project includes two deployment scripts for Azure Functions:

### Option 1: Simplified Deployment (Recommended)
Use the main deployment script that uses the existing project configuration:

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

### Option 2: Deployment with Custom Project Configuration
Use the working deployment script that creates a custom project file for deployment:

```bash
# Make the script executable
chmod +x deploy-working.sh

# Run the deployment
./deploy-working.sh
```

### Manual Deployment Steps

If you prefer to deploy manually, follow these steps:

1. **Build and publish the project:**
   ```bash
   dotnet publish API.csproj -c Release -o ./publish
   ```

2. **Create deployment package:**
   ```bash
   cd ./publish
   zip -r ../deploy.zip .
   cd ..
   ```

3. **Deploy to Azure Function App:**
   ```bash
   # Replace 'your-function-app-name' with your actual Function App name
   az functionapp deployment source config-zip \
       --name "your-function-app-name" \
       --resource-group $(az functionapp list --query "[?name=='your-function-app-name'].resourceGroup" -o tsv) \
       --src ./deploy.zip
   ```

4. **Restart the Function App:**
   ```bash
   az functionapp restart \
       --name "your-function-app-name" \
       --resource-group $(az functionapp list --query "[?name=='your-function-app-name'].resourceGroup" -o tsv)
   ```

## Configuration

### Function App Name
Before deploying, update the `FUNCTION_APP_NAME` variable in the deployment scripts:

```bash
# In deploy.sh or deploy-working.sh
FUNCTION_APP_NAME="your-function-app-name"
```

### Project Dependencies
The project uses the following key packages:
- Microsoft.Azure.Functions.Worker (1.24.0)
- Microsoft.Azure.Functions.Worker.Sdk (1.17.2)
- Microsoft.Azure.Functions.Worker.Extensions.Http (3.1.0)
- Entity Framework Core (6.0.0) - Currently excluded from deployment

## Testing the Deployment

After successful deployment, the scripts will automatically test the endpoint. You can also manually test:

```bash
# Replace with your Function App hostname
curl https://your-function-app.azurewebsites.net/api/test
```

Expected response:
```
Hello, this is a test function (isolated, .NET 8)!
```

## Troubleshooting

### Common Issues

1. **Authentication Errors:**
   - Ensure you're logged into Azure CLI: `az login`
   - Verify your subscription access: `az account show`

2. **Function App Not Found:**
   - Check that the Function App name in the script matches your Azure resource
   - Verify the Function App exists in your subscription

3. **Deployment Failures:**
   - Check that your Function App is configured for .NET 8
   - Ensure the Function App is using the isolated worker model

4. **Build Errors:**
   - Verify .NET 8 SDK is installed: `dotnet --version`
   - Run `dotnet restore` to ensure all packages are available

### Logs and Monitoring
- View deployment logs in the Azure portal
- Monitor function execution in Azure Application Insights
- Use Azure CLI to stream logs: `az functionapp log tail --name your-function-app-name --resource-group your-resource-group`

## Development

### Local Development
```bash
# Install Azure Functions Core Tools (if not already installed)
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# Run locally
func start
```

### Project Structure
```
API-Example/
├── Endpoints/          # Function endpoints
│   └── TestFunction.cs # Sample test function
├── Database/           # Data access layer (excluded from deployment)
├── Helpers/           # Utility classes
├── Models/            # Data models
├── deploy.sh          # Main deployment script
├── deploy-working.sh  # Alternative deployment script
└── README.md          # This file
```
