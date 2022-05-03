FROM node:14.17-alpine
WORKDIR /usr/app

COPY . .
RUN npm install

ENTRYPOINT npm run build && npm start