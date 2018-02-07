FROM node:9.5.0

WORKDIR /usr/src/library

COPY . .

RUN npm install

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
