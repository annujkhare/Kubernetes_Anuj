# Kubernetes Assignment — Flask Frontend and Express Backend

This project matches the assignment architecture: Flask serves the web form on port 5000, and Express processes form submissions on port 3000.

## Folder structure

- `frontend/`: Flask app, HTML templates, requirements, Dockerfile
- `backend/`: Express API, package.json, Dockerfile
- `k8s/`: Kubernetes Deployment and Service YAML files
- `screenshots/`: Add your real terminal and browser screenshots here

## Build and load images (PowerShell, from project root)

```powershell
docker build -t express-backend:local ./backend
docker build -t flask-frontend:local ./frontend
minikube image load express-backend:local
minikube image load flask-frontend:local
```

## Deploy

```powershell
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get all
minikube service frontend-service
```

Open the URL printed by Minikube and submit the form. Flask forwards form data to `http://backend:3000/submit` using the Kubernetes Service DNS name.

## Local test with Docker Compose

```powershell
docker compose up --build -d
docker compose ps
docker compose logs frontend
docker compose logs backend
docker compose down
```

## Screenshots and submission

Save genuine screenshots in `screenshots/`. Add the documentation file and GitHub repository URL before compressing the complete folder into a ZIP.
