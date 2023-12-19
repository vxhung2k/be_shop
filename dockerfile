FROM node:lts-alpine

WORKDIR /APP 
EXPOSE 4000

COPY package.json yarn.lock ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install

COPY . .

CMD [ "yarn", "start:dev" ]
