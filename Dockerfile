FROM node:18-alpine as builder

ENV PRODUCT_SERVICE_URL=http://LB-OShop-1431069936.eu-north-1.elb.amazonaws.com:8082
ENV ORDER_SERVICE_URL=http://LB-OShop-1431069936.eu-north-1.elb.amazonaws.com:8083
ENV USER_SERVICE_URL=http://LB-OShop-1431069936.eu-north-1.elb.amazonaws.com:8084
ENV RABBITMQ_URL=ws://LB-OShop-1431069936.eu-north-1.elb.amazonaws.com:15674/ws

# specify the work directory in docker
WORKDIR /usr/src
COPY package.json package-lock.json ./

# download and install dependencies defined in package.json
RUN npm install --force
# install the angular cli
RUN npm i @angular/cli@17.0.0 --force
COPY . .

RUN npm run build

# Second stage
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/dist/oshop /usr/share/nginx/html
