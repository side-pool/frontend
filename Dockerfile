FROM node:14-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build-prod

FROM nginx:1.17-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]