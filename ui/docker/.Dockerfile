FROM node:20-alpine3.19

LABEL maintainer="https://github.com/geosdevs"

WORKDIR /app

ENV NODE_ENV=production

RUN npm install --global serve

COPY public public
COPY src src
COPY package-lock.json .
COPY package.json .
COPY tailwind.config.js .
COPY tsconfig.json .

RUN npm install \
  && npm run build
  
RUN rm -rf src public package-lock.json package.json tailwind.config.js tsconfig.json node_modules \
  && npm cache clean --force \
  && mv build/* .

EXPOSE 4200
USER node

ENTRYPOINT ["serve", "-l", "4200"]