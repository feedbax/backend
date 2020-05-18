FROM endeveit/docker-jq AS deps

COPY ./packages/server/package.json /tmp/package.json
RUN jq '{ dependencies, devDependencies, scripts }' < /tmp/package.json > /tmp/deps.json

# -----

FROM node:12.13.0-stretch as build

WORKDIR /shared

COPY ./packages/shared .

RUN yarn install
RUN yarn build

WORKDIR /server

COPY --from=deps /tmp/deps.json ./package.json
COPY ./packages/server/yarn.lock ./yarn.lock

RUN yarn install

COPY ./packages/server/tsconfig.json ./tsconfig.json
COPY ./packages/server/src ./src

RUN yarn build

# -----

FROM ubuntu:20.04

COPY --from=build ./server/dist/bin/feedbax-backend-server /backend/feedbax-backend-server

CMD [ "/backend/feedbax-backend-server" ]
