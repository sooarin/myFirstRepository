# Node.js 20 버전 기반 이미지
FROM node:20

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치를 위한 package 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 코드 복사
COPY . .

# 앱 포트 개방
EXPOSE 3000

# NestJS 앱 실행 명령
CMD ["npm", "run", "start:dev"]
