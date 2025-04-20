# 1단계: 빌드 전용 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

# 2단계: 실행 전용 스테이지 (불필요한 의존성 제거)
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
