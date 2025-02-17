#!/bin/bash

# 設定變數
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
FRONTEND_IMAGE_NAME="frontend-app"
BACKEND_IMAGE_NAME="backend-app"

# 構建前端映像
echo "Building frontend Docker image..."
docker build -t $FRONTEND_IMAGE_NAME $FRONTEND_DIR || { echo "Frontend build failed!"; exit 1; }

# 構建後端映像
echo "Building backend Docker image..."
docker build -t $BACKEND_IMAGE_NAME $BACKEND_DIR || { echo "Backend build failed!"; exit 1; }

# 啟動前端容器
echo "Running frontend container..."
docker run -d --name frontend-container -p 3000:3000 $FRONTEND_IMAGE_NAME || { echo "Frontend container run failed!"; exit 1; }

# 啟動後端容器
echo "Running backend container..."
docker run -d --name backend-container -p 1337:1337 $BACKEND_IMAGE_NAME || { echo "Backend container run failed!"; exit 1; }

echo "Build and run completed successfully!"
