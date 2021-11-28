FROM node:16 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm ci
COPY . ./
RUN export GH_TOKEN=$GH_TOKEN && npm run build-prod

FROM nginx:1.17-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]