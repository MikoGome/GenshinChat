FROM node:14.17-alpine
WORKDIR /usr/app

COPY package*.json .
RUN npm install
COPY . .

ENTRYPOINT npm run build && npm start