FROM node:18-slim

WORKDIR /app

COPY ./package*.json ./
RUN npm ci
COPY . .

# Add wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

RUN npm install -g sequelize-cli
CMD ["sh", "-c", "wait-for-it mysqldb:3307 -- sequelize db:migrate && npm start"]

# CMD ["npm", "start"]
