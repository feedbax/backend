FROM endeveit/docker-jq AS deps

COPY ./packages/auto-archiver/package.json /tmp/package.json
RUN jq '{ dependencies, devDependencies, scripts }' < /tmp/package.json > /tmp/deps.json

# -----

FROM node:12.13.0-stretch as build

WORKDIR /shared

COPY ./packages/shared .

RUN yarn install
RUN yarn build

WORKDIR /auto-archiver

COPY --from=deps /tmp/deps.json ./package.json
COPY ./packages/auto-archiver/yarn.lock ./yarn.lock

RUN yarn install

COPY ./packages/auto-archiver/tsconfig.json ./tsconfig.json
COPY ./packages/auto-archiver/src ./src

RUN yarn build

# -----

FROM ubuntu:20.04

COPY --from=build ./auto-archiver/dist/bin/feedbax-auto-archiver /backend/feedbax-auto-archiver

CMD [ "/backend/feedbax-auto-archiver" ]
