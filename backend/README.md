# Week 1 API Project

Simple Express API with TypeScript deployed on Azure Cloud as part of the MindX Engineer Onboarding – Week 1.

---

## Features

- ✅ RESTful API with Express.js and TypeScript
- ✅ JWT-based authentication (Access Token + Refresh Token)
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration for user and session management
- ✅ Protected routes with JWT middleware
- ✅ Health check endpoint (`/health`)
- ✅ Containerized with Docker (multi-stage builds)
- ✅ Deployed on Azure Kubernetes Service (AKS)

---

## Setup

### Prerequisites

- Node.js 20+
- Docker
- Azure CLI
- Azure subscription
- kubectl

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following required environment variables:

### Required Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - Secret key for JWT token signing
- `FRONTEND_URL` - Frontend URL for CORS configuration

### Optional Variables

- `APPLICATIONINSIGHTS_CONNECTION_STRING` - Azure Application Insights connection string (for monitoring and observability)

**Note:** If `APPLICATIONINSIGHTS_CONNECTION_STRING` is not set, Application Insights will be disabled (graceful degradation).

See [Azure Application Insights Setup Guide](../../docs/plans/week-2/azure-app-insights-setup.md) for detailed setup instructions.

## Local Development

```bash
npm install
npm run dev
npm run build
npm start
```

---

## Docker

```bash
docker build -t week1-api:latest .
docker run -p 3000:3000 week1-api:latest
```

---

## Azure Deployment – Azure Kubernetes Service (AKS)

### Resources

- **ACR:** mindxtien2026.azurecr.io
- **Resource Group:** mindx-intern-06-rg
- **Web App:** https://victor-filed-freebsd-performance.trycloudflare.com


### Steps

```bash
docker build -t mindxtien2026.azurecr.io/week1-api:latest .
docker push mindxtien2026.azurecr.io/week1-api:latest
```

---

## 🔐 Authentication Flow

### Overview

The backend implements JWT-based authentication with dual-token system:

1. **Access Token (JWT)**: Short-lived token (30 minutes) sent in `Authorization` header
2. **Refresh Token**: Long-lived token (14 days) stored as HTTP-only cookie and in MongoDB

### Authentication Process

1. **User Login:**
   - User submits username and password
   - Backend validates credentials
   - Backend generates:
     - Access token (JWT) - returned in response body
     - Refresh token (random 64-byte hex) - stored in HTTP-only cookie
   - Refresh token stored in MongoDB `Session` collection

2. **Accessing Protected Routes:**
   - Frontend sends access token in `Authorization: Bearer <token>` header
   - Backend middleware verifies token
   - If valid, request proceeds; if invalid, returns 401/403

3. **Token Refresh:**
   - When access token expires (401 error), frontend calls `/auth/refresh`
   - Backend reads refresh token from cookie
   - Backend validates refresh token in MongoDB
   - Backend issues new access token

4. **User Logout:**
   - Frontend calls `/auth/signout`
   - Backend deletes refresh token from MongoDB
   - Backend clears refresh token cookie

---

## 🚢 Deployment

### Automated Deployment

Use the deployment script:
```bash
npm run deploy
```

Or from root directory:
```bash
npm run deploy:backend
```

This script:
1. Builds TypeScript
2. Builds Docker image
3. Pushes to Azure Container Registry (ACR)
4. Updates Kubernetes deployment
5. Waits for rollout

### Manual Deployment

#### Build and Push to ACR

```bash
docker build -t mindxtien2026.azurecr.io/week1-api:latest .
az acr login --name mindxtien2026
docker push mindxtien2026.azurecr.io/week1-api:latest
```

#### Deploy to AKS

```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

#### Create Kubernetes Secrets

```bash
kubectl create secret generic week1-api-secrets \
  --from-literal=MONGODB_URI='<your-mongodb-uri>' \
  --from-literal=ACCESS_TOKEN_SECRET='<your-access-token-secret>' \
  --from-literal=FRONTEND_URL='<your-frontend-url>' \
  --from-literal=APPLICATIONINSIGHTS_CONNECTION_STRING='<your-app-insights-connection-string>'
```

**Note:** `APPLICATIONINSIGHTS_CONNECTION_STRING` is optional. If not provided, Application Insights will be disabled (graceful degradation).

#### Update Deployment

```bash
kubectl set image deployment/week1-api \
  week1-api-container=mindxtien2026.azurecr.io/week1-api:latest
kubectl rollout status deployment/week1-api
```

### Verify Deployment

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
kubectl port-forward svc/week1-api-service 8080:80
```

Access: `http://localhost:8080`

---

## API Endpoints

### Public Endpoints

- `GET /` - Hello World
- `GET /health` - Health check

### Authentication Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login (returns access token, refresh token in cookie)
- `POST /auth/refresh` - Refresh access token
- `POST /auth/signout` - User logout

### Protected Endpoints (Require JWT Token)

- `GET /user/me` - Get current user information

**All protected endpoints require:**
```
Authorization: Bearer <accessToken>
```

---

## Notes

- Azure Kubernetes Service (AKS) is used for public hosting.
- AKS deployment uses ClusterIP service for internal communication and future ingress routing.


MindX Engineer Onboarding – Week 1
