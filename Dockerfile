FROM --platform=linux/amd64 node:20-alpine AS build
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:20-alpine AS client
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:20-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY --from=build /usr/src/app/dist ./
COPY src/client ./client
COPY --from=client /usr/src/app/dist ./client
CMD node main.js
