# syntax=docker/dockerfile:1
FROM node:16.14.0

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm install typescript -g

COPY . .

CMD [ "node", "./build/api.js" ]

