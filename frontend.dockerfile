# Stage 1: Build Angular App
FROM node:20.10.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build --prod

# Stage 2: Set up Nginx and Certbot
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates
COPY fullchain.pem /etc/ssl/certs/fullchain.pem
COPY privkey.pem /etc/ssl/private/privkey.pem

# Copy Angular build output to Nginx's HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP (port 80) for Certbot to validate and HTTPS (port 443) for secure traffic
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]