FROM node:9.5.0

RUN mkdir -p /usr/src/library

COPY ./config /usr/src/library/config
COPY ./src /usr/src/library/src
COPY ./package.json /usr/src/library/package.json
COPY ./package-lock.json /usr/src/library/package-lock.json
COPY ./.sequelizerc /usr/src/library/.sequelizerc
COPY ./static /usr/src/library/static
COPY ./wait-for-it.sh /usr/src/library/wait-for-it.sh

WORKDIR /usr/src/library

RUN npm install

EXPOSE 3001
CMD ["npm", "start"]
