# Week 1 API Project

Simple Express API with TypeScript deployed on Azure Cloud.

## Features

- Health check endpoint (`/health`)
- Hello World endpoint (`/`)
- Containerized with Docker
- Deployed to Azure Web App

## Setup

### Prerequisites

- Node.js 20+
- Docker
- Azure CLI
- Azure subscription

### Local Development

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run production
npm start### Docker

# Build image
docker build -t week1-api:latest .

# Run container
docker run -p 3000:3000 week1-api:latest### Azure Deployment

- **ACR:** mindxtien2026.azurecr.io
- **Web App:** https://<your-app-name>.azurewebsites.net
- **Resource Group:** mindx-intern-06-rg

### Endpoints

- `GET /` - Hello World
- `GET /health` - Health check

## Deployment Steps

1. Build and push to ACR:
  
   docker build -t mindxtien2026.azurecr.io/week1-api:latest .
   docker push mindxtien2026.azurecr.io/week1-api:latest
   2. Deploy to Azure Web App (already configured)

## Author

MindX Engineer Onboarding - Week 1