FROM node:boron

RUN apt-get update -qq && apt-get install -y build-essential

RUN mkdir /src

WORKDIR /src
