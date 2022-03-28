# Stage 1

FROM node:14.1-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY /frontend /app

RUN npm install

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/frontend /usr/share/nginx/html