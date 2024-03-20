FROM node:20-alpine AS build
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY --from=build /usr/src/app/dist ./
CMD node main.js
