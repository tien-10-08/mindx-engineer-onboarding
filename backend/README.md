# Week 1 API Project

Simple Express API with TypeScript deployed on Azure Cloud as part of the MindX Engineer Onboarding – Week 1.

---

## Features

- Health check endpoint (`/health`)
- Hello World endpoint (`/`)
- Containerized with Docker
- Deployed using:
  - Azure Web App
  - Azure Kubernetes Service (AKS)

---

## Setup

### Prerequisites

- Node.js 20+
- Docker
- Azure CLI
- Azure subscription
- kubectl

---

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

## Azure Deployment – Azure Web App

### Resources

- **ACR:** mindxtien2026.azurecr.io
- **Resource Group:** mindx-intern-06-rg
- **Web App:** https://<your-app-name>.azurewebsites.net

### Steps

```bash
docker build -t mindxtien2026.azurecr.io/week1-api:latest .
docker push mindxtien2026.azurecr.io/week1-api:latest
```

---

## Azure Kubernetes Service (AKS)

### Folder Structure

```
kubernetes/
├─ deployment.yaml
├─ service.yaml
```

### Deploy to AKS

```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

### Verify Deployment

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
```

### Test API internally

```bash
kubectl port-forward svc/week1-api-service 8080:80
```

Access:
```
http://localhost:8080
```

---

## API Endpoints

- `GET /`
- `GET /health`

---

## Notes

- Azure Web App is used for public hosting.
- AKS deployment uses ClusterIP service for internal communication and future ingress routing.

---

## Author

MindX Engineer Onboarding – Week 1
