FROM node:alpine as builder
WORKDIR '/app'
COPY ./package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
