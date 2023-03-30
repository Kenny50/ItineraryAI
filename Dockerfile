FROM node:18-slim

WORKDIR /app

COPY ./package*.json ./
RUN npm ci
COPY . .

RUN npm install -g sequelize-cli
CMD ["sh", "-c", "sequelize db:migrate && npm start"]

# CMD ["npm", "start"]
