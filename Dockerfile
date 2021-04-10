# This file tells Docker how to set up the environment for our container.

FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
