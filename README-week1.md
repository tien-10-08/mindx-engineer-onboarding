# Week 1: Full-Stack Authentication Application

Full-stack authentication application with JWT-based authentication, deployed on Azure Kubernetes Service (AKS).

## 📋 Project Overview

This project is a complete authentication system built as part of the MindX Engineer Onboarding program. It consists of a React frontend and a Node.js/Express backend, both deployed on Azure Cloud infrastructure with HTTPS enabled.

### Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB, JWT
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Ant Design
- **DevOps**: Docker, Kubernetes (AKS), Azure Container Registry (ACR)

### Live Demo

- **Frontend**: https://victor-filed-freebsd-performance.trycloudflare.com
- **Repository**: https://github.com/tien-10-08/mindx-engineer-onboarding

---

## 🚀 Setup

### Prerequisites

- Node.js 20+
- Docker
- Azure CLI
- kubectl
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tien-10-08/mindx-engineer-onboarding.git
   cd mindx-engineer-onboarding
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Backend Setup**
   - Create `.env` file in `backend/` directory with required environment variables
   - See [Backend Setup](#-backend-setup) section below

4. **Frontend Setup**
   - Create `.env` file in `frontend/` directory with required environment variables
   - See [Frontend Setup](#-frontend-setup) section below

### Local Development

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🔧 Backend Setup

### Features

- ✅ RESTful API with Express.js and TypeScript
- ✅ JWT-based authentication (Access Token + Refresh Token)
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration for user and session management
- ✅ Protected routes with JWT middleware
- ✅ Health check endpoint (`/health`)
- ✅ Containerized with Docker (multi-stage builds)
- ✅ Deployed on Azure Kubernetes Service (AKS)

### Environment Variables

Create a `.env` file in the `backend/` directory with the following required environment variables:

#### Required Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - Secret key for JWT token signing
- `FRONTEND_URL` - Frontend URL for CORS configuration

### Local Development

```bash
npm install
npm run dev
npm run build
npm start
```

### Docker

```bash
docker build -t week1-api:latest .
docker run -p 3000:3000 week1-api:latest
```

### Azure Deployment – Azure Kubernetes Service (AKS)

#### Resources

- **ACR:** mindxtien2026.azurecr.io
- **Resource Group:** mindx-intern-06-rg
- **Web App:** https://victor-filed-freebsd-performance.trycloudflare.com

#### Automated Deployment

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

#### Manual Deployment

**Build and Push to ACR:**

```bash
docker build -t mindxtien2026.azurecr.io/week1-api:latest .
az acr login --name mindxtien2026
docker push mindxtien2026.azurecr.io/week1-api:latest
```

**Deploy to AKS:**

```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

**Create Kubernetes Secrets:**

```bash
kubectl create secret generic week1-api-secrets \
  --from-literal=MONGODB_URI='<your-mongodb-uri>' \
  --from-literal=ACCESS_TOKEN_SECRET='<your-access-token-secret>' \
  --from-literal=FRONTEND_URL='<your-frontend-url>'
```

**FRONTEND_URL:** URL production (ví dụ: `https://victor-filed-freebsd-performance.trycloudflare.com` khi dùng Cloudflare). CORS cho phép thêm `*.trycloudflare.com`.

**Update Deployment:**

```bash
kubectl set image deployment/week1-api \
  week1-api-container=mindxtien2026.azurecr.io/week1-api:latest
kubectl rollout status deployment/week1-api
```

**Verify Deployment:**

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
kubectl port-forward svc/week1-api-service 8080:80
```

Access: `http://localhost:8080`

### API Endpoints

#### Public Endpoints

- `GET /` - Hello World
- `GET /health` - Health check

#### Authentication Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login (returns access token, refresh token in cookie)
- `POST /auth/refresh` - Refresh access token
- `POST /auth/signout` - User logout

#### Protected Endpoints (Require JWT Token)

- `GET /user/me` - Get current user information

**All protected endpoints require:**
```
Authorization: Bearer <accessToken>
```

---

## 🎨 Frontend Setup

### Project Overview

React frontend application for the MindX Engineer Onboarding project. Provides user interface for authentication (login/signup) and protected pages, communicating with the backend API.

### Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Ant Design
- **Form Management**: React Hook Form
- **Form Validation**: Zod
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Routing**: React Router v6

### Environment Variables

Create `.env` file in `frontend/` directory with required environment variables:

- `VITE_API_BASE_URL` - Backend API base URL

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

### Deployment

#### Automated Deployment

Use the deployment script:
```bash
npm run deploy
```

Or from root directory:
```bash
npm run deploy:frontend
```

This script:
1. Builds the React application
2. Builds Docker image
3. Pushes to Azure Container Registry (ACR)
4. Updates Kubernetes deployment
5. Waits for rollout

**Note:** Environment variables must be set at build time for Vite applications.

#### Manual Deployment

**Build and Push to ACR:**

1. **Set environment variable** (at build time)

2. **Build Docker image:**
   ```bash
   docker build -t mindxtien2026.azurecr.io/week1-frontend:latest .
   ```

3. **Push to ACR:**
   ```bash
   az acr login --name mindxtien2026
   docker push mindxtien2026.azurecr.io/week1-frontend:latest
   ```

**Deploy to AKS:**

```bash
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/frontend-service.yaml
```

**Update Deployment:**

```bash
kubectl set image deployment/week1-frontend \
  frontend=mindxtien2026.azurecr.io/week1-frontend:latest
kubectl rollout status deployment/week1-frontend
```

**Verify Deployment:**

```bash
kubectl get pods -l app=week1-frontend
kubectl get svc week1-frontend-service
```

### Project Structure

```
frontend/
├── src/
│   ├── pages/          # React pages (Login, Signup, Home)
│   ├── components/     # Reusable components (ProtectedRoute)
│   ├── contexts/       # AuthContext for state management
│   ├── services/       # API service functions
│   ├── utils/          # Utilities (token storage, validation)
│   └── lib/            # Axios instance with interceptors
├── kubernetes/         # K8s deployment configs
├── Dockerfile          # Multi-stage Docker build
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to AKS

---

## 🔐 Authentication Flow

### Overview

The application uses JWT-based authentication with dual-token system:

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

### Frontend Routes

- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/` - Home page (protected, requires authentication)

---

## 📁 Project Structure

```
mindx-engineer-onboarding/
├── backend/              # Express API
│   ├── src/
│   ├── kubernetes/       # K8s deployment configs
│   └── package.json
├── frontend/             # React App
│   ├── src/
│   ├── kubernetes/       # K8s deployment configs
│   └── package.json
├── package.json          # Root deployment scripts
├── README-week1.md       # This file
└── README-week2.md       # Week 2 documentation
```

---

## 📚 Documentation

- **[README-week2.md](./README-week2.md)** - Complete Week 2 documentation (Azure App Insights, Google Analytics, Alerts)

---

## Notes

- Azure Kubernetes Service (AKS) is used for public hosting.
- AKS deployment uses ClusterIP service for internal communication and future ingress routing.

---

**MindX Engineer Onboarding – Week 1**
