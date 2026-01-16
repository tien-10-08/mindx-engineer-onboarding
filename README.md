# MindX Engineer Onboarding

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
   - See [backend/README.md](./backend/README.md) for detailed setup

4. **Frontend Setup**
   - Create `.env` file in `frontend/` directory with required environment variables
   - See [frontend/README.md](./frontend/README.md) for detailed setup

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

## 🚢 Deployment

Deployment scripts and configurations are provided in the repository. See individual README files for deployment instructions:

- [Backend Deployment](./backend/README.md)
- [Frontend Deployment](./frontend/README.md)

---

## 🔐 Authentication Flow

The application uses JWT-based authentication with access tokens and refresh tokens. See [Backend README - Authentication Flow](./backend/README.md#authentication-flow) for detailed information.

---

## 📁 Project Structure

```
mindx-engineer-onboarding/
├── backend/              # Express API
│   ├── src/
│   ├── kubernetes/       # K8s deployment configs
│   └── README.md
├── frontend/             # React App
│   ├── src/
│   ├── kubernetes/       # K8s deployment configs
│   └── README.md
├── package.json          # Root deployment scripts
└── README.md             # This file
```

---

## 📚 Documentation

- **[Backend README](./backend/README.md)** - Backend API, authentication flow, deployment
- **[Frontend README](./frontend/README.md)** - Frontend setup, authentication, deployment


MindX Engineer Onboarding - Week 1
