#!/bin/bash

# WORKING Azure Function App Deploy Script
# This script uses the proven zip deployment method that successfully deploys .NET 8 isolated functions

set -e

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

FUNCTION_APP_NAME="r-record"
PUBLISH_DIR="./publish-direct"
ZIP_FILE="./deploy.zip"

print_status "🚀 Starting WORKING Azure Function deployment..."

# Step 1: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf "$PUBLISH_DIR"
rm -f "$ZIP_FILE"

# Step 2: Create deployment-specific project file (without problematic packages)
print_status "Creating deployment-specific project file..."
cat > API-Deploy.csproj << 'EOF'
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <AzureFunctionsVersion>v4</AzureFunctionsVersion>
    <OutputType>Exe</OutputType>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <!-- Azure Functions .NET Isolated packages -->
    <PackageReference Include="Microsoft.Azure.Functions.Worker" Version="1.24.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Sdk" Version="1.17.2" OutputItemType="Analyzer" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Extensions.Http" Version="3.1.0" />
  </ItemGroup>

  <ItemGroup>
    <None Update="host.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
    <None Update="local.settings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>

  <!-- Exclude folders that depend on removed model files -->
  <ItemGroup>
    <Compile Remove="Database/**/*.cs" />
    <Compile Remove="Mappers/**/*.cs" />
    <Compile Remove="Migrations/**/*.cs" />
  </ItemGroup>
</Project>
EOF

# Step 3: Publish using deployment project
print_status "Publishing .NET 8 isolated function..."
dotnet publish API-Deploy.csproj -c Release -o "$PUBLISH_DIR"

print_success "✅ Publish completed to $PUBLISH_DIR"

# Step 3: Create zip package
print_status "Creating deployment package..."
cd "$PUBLISH_DIR"
zip -r "../$ZIP_FILE" .
cd ..

print_success "✅ Deployment package created: $ZIP_FILE"

# Step 4: Deploy using Azure CLI zip deployment
print_status "Deploying to Azure Function App: $FUNCTION_APP_NAME"
print_warning "⏳ This deployment method has been proven to work..."

az functionapp deployment source config-zip \
    --name "$FUNCTION_APP_NAME" \
    --resource-group $(az functionapp list --query "[?name=='$FUNCTION_APP_NAME'].resourceGroup" -o tsv) \
    --src "$ZIP_FILE"

print_success "✅ Deployment completed successfully!"

# Step 5: Restart function app
print_status "Restarting function app..."
az functionapp restart \
    --name "$FUNCTION_APP_NAME" \
    --resource-group $(az functionapp list --query "[?name=='$FUNCTION_APP_NAME'].resourceGroup" -o tsv)

print_status "⏳ Waiting for function app to initialize..."
sleep 30

# Step 6: Test the endpoint
print_status "Testing deployed function..."
HOSTNAME=$(az functionapp show --name "$FUNCTION_APP_NAME" --resource-group $(az functionapp list --query "[?name=='$FUNCTION_APP_NAME'].resourceGroup" -o tsv) --query "defaultHostName" -o tsv)

echo ""
print_status "🌐 Function URL: https://$HOSTNAME/api/test"
echo ""

RESPONSE=$(curl -s -w "HTTPSTATUS:%{http_code}" "https://$HOSTNAME/api/test")
HTTP_CODE=$(echo $RESPONSE | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
RESPONSE_BODY=$(echo $RESPONSE | sed -E 's/HTTPSTATUS\:[0-9]*$//')

if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "🎉 SUCCESS! Function is working on Azure!"
    echo "Response: $RESPONSE_BODY"
else
    print_warning "⚠️  HTTP Status: $HTTP_CODE"
    echo "Response: $RESPONSE_BODY"
fi

# Step 7: Cleanup
print_status "Cleaning up temporary files..."
rm -rf "$PUBLISH_DIR"
rm -f "$ZIP_FILE"
rm -f "API-Deploy.csproj"

print_success "🏁 Deployment script completed!"
echo ""
print_status "Your function is available at: https://$HOSTNAME/api/test"
