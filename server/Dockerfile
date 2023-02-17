FROM node:latest

WORKDIR /app/server

RUN apt-get update && apt-get install -y --no-install-recommends netcat

ADD package*.json /app/server

RUN npm i

COPY . /app/server/

EXPOSE 9999

CMD ["npm","start"]
