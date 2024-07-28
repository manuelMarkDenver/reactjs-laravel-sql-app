# Dockerfile for React App
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use a smaller image for the final stage
FROM nginx:alpine

# Change build to dist
COPY --from=build /app/dist /usr/share/nginx/html  

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
