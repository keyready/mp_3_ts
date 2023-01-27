FROM node:12

WORKDIR /app/server

RUN apt-get update && apt-get install -y --no-install-recommends netcat

ADD package.json /app/server

RUN npm uninstall bcrypt
RUN npm i bcrypt

RUN npm i

EXPOSE 9999

CMD ["npm","start"]
