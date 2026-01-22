# Frontend - React Authentication Application

React + TypeScript + Vite frontend application with JWT authentication, deployed on Azure Kubernetes Service (AKS).

---

## 📋 Project Overview

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

---

## 🚀 Setup

### Prerequisites

- Node.js 20+
- npm 

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in `frontend/` directory with required environment variables:**
   - `VITE_API_BASE_URL` - Backend API base URL 
   - `VITE_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID

3. **Run development server:**
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔐 Authentication Flow

### Overview

The frontend implements JWT-based authentication with automatic token refresh:

1. **User Login/Signup**
   - User submits credentials via form
   - Frontend calls backend API
   - Backend returns access token
   - Frontend stores access token in localStorage
   - Refresh token is stored in HTTP-only cookie by backend

2. **Protected Routes**
   - `ProtectedRoute` component checks authentication status
   - If not authenticated, redirects to login page
   - If authenticated, renders the protected page

3. **Token Refresh**
   - Axios interceptor detects 401 (Unauthorized) errors
   - Automatically calls `/auth/refresh` endpoint
   - Backend validates refresh token from cookie
   - Backend returns new access token
   - Failed request is retried with new token

4. **User Logout**
   - Frontend calls `/auth/signout` endpoint
   - Backend clears refresh token cookie
   - Frontend removes access token from localStorage
   - User is redirected to login page

### Routes

- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/` - Home page (protected, requires authentication)

---

## 🚢 Deployment

### Automated Deployment

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

### Manual Deployment

#### Build and Push to ACR

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

#### Deploy to AKS

```bash
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/frontend-service.yaml
```

#### Update Deployment

```bash
kubectl set image deployment/week1-frontend \
  frontend=mindxtien2026.azurecr.io/week1-frontend:latest
kubectl rollout status deployment/week1-frontend
```

### Verify Deployment

```bash
kubectl get pods -l app=week1-frontend
kubectl get svc week1-frontend-service
```

---

## 📁 Project Structure

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

---

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to AKS

---

---

## 📊 Analytics & Product Metrics (Week 2)

### Google Analytics 4

The frontend is integrated with **Google Analytics 4** for product metrics and user behavior tracking.

#### Features

- **Page View Tracking**: Automatic tracking of all route changes (Login, Signup, Home, Profile, etc.)
- **Custom Events**: Authentication events (login, signup, logout, failed attempts) tracked with user context
- **Real-time Reports**: Live user activity, page views, and events
- **User Engagement**: Session tracking, user flow analysis

#### Setup

1. **Get Measurement ID**: Google Analytics 4 → Admin → Data Streams → Web → Measurement ID
2. **Add to `.env` file**:
   ```bash
   VITE_GA_MEASUREMENT_ID
   ```
3. **Rebuild and Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

#### Access Analytics

- **Real-time**: Google Analytics 4 → Reports → Realtime
- **Events**: Google Analytics 4 → Reports → Engagement → Events
- **User Activity**: Google Analytics 4 → Reports → User → User activity

#### Implementation Details

- **Initialization**: `src/services/analytics.ts` - Singleton pattern, initialized on app startup
- **Page Tracking**: `src/components/GoogleAnalytics.tsx` - React Router integration for automatic page views
- **Event Tracking**: Custom events for authentication flows, form submissions, errors
- **PII Protection**: No personally identifiable information (PII) is sent to GA4

#### Tracked Events

| Event | Category | Action | When Triggered |
|-------|----------|--------|-----------------|
| Page View | Page | View | Route change (automatic) |
| Login | Authentication | login | Successful login |
| Signup | Authentication | signup | Successful signup |
| Logout | Authentication | logout | User logout |
| Login Failed | Authentication | failed | Failed login attempt |
| Error | Error | error | Frontend error caught |

---

## 📚 Additional Resources

- **[Backend README](../backend/README.md)** - Backend API documentation, monitoring setup
- **[Root README](../README.md)** - Project overview, monitoring overview


MindX Engineer Onboarding - Week 1 & Week 2
