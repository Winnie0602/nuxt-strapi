# 使用 Node.js 官方镜像作为基础镜像
FROM node:20

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件到容器
COPY . .

# 设置容器启动命令
CMD ["npm", "start"]

# 暴露 Strapi 默认端口
EXPOSE 1337
