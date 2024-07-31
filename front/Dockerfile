## Fichier : ./react-docker/Dockerfile
FROM node:18.10.0-alpine3.15

WORKDIR /usr/src/app/react-docker

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]