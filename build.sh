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

echo "Build completed successfully!"
