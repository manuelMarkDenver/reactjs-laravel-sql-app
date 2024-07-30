# # frontend/Dockerfile

# # Use the official node image as the base image
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Expose the port the app runs on
# EXPOSE 5173

# # Start the application
# CMD ["npm", "run", "dev"]

# Stage 1: Build the React app
FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

