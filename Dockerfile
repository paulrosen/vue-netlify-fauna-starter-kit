FROM node:14.11.0

RUN mkdir /srv/app && chown node:node /srv/app

# TODO-PER: There are build problems using the latest version.
RUN npm install netlify-cli@2.45 -g

USER node

WORKDIR /srv/app
