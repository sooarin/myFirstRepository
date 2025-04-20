FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json /app/
COPY tsconfig.json /app/

COPY . /app/

RUN npm install && npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node",  "dist/main"]