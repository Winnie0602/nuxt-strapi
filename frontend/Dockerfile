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

# 构建 Nuxt 项目
RUN npm run build

# 启动 Nuxt 项目，执行 index.mjs 文件
CMD ["node", ".output/server/index.mjs"]

# 暴露 Nuxt 默认端口
EXPOSE 3000
