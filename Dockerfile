FROM node:14.17-alpine
WORKDIR /usr/app
EXPOSE 3000

COPY package*.json .
RUN npm install
COPY . .

ENTRYPOINT npm run build && npm start