# FROM node:24-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host"]

FROM node:24-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm i --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
