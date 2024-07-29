# Project Name

## Overview

This project uses Docker Desktop and Docker Compose to manage a multi-service application. It includes a React frontend, a Laravel backend, and a MySQL database. Docker Compose is used to orchestrate the services, ensuring they work together seamlessly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop**: Docker Desktop is required to build and run the containers. You can download it from the [Docker website](https://www.docker.com/products/docker-desktop).
- **Git**: Git is required to clone the repository. You can download it from the [Git website](https://git-scm.com/downloads).

## Getting Started

Follow these instructions to build and start the application using Docker Compose.

### 1. Clone the Repository

First, clone the repository to your local machine using Git:


[git clone https://github.com/your-username/your-repo.git](https://github.com/manuelMarkDenver/reactjs-laravel-sql-app.git)
cd your-repo


### 2. Build the Containers
Use Docker Compose to build the Docker containers defined in your docker-compose.yml file:

docker-compose build

This command will build the images for the services defined in your Docker Compose file.

### 3. Start the Containers
Once the build is complete, start the containers using:
docker-compose up

This command will start all the services defined in your Docker Compose file and will keep them running in the foreground.

### 4. Access the Application
After starting the containers, you can access the application components as follows:

Frontend: Open your web browser and navigate to http://localhost:3000 to access the React frontend.
Backend: The Laravel backend will be accessible at http://localhost:8000.
Database: The MySQL database can be accessed at localhost:3306 with the credentials defined in your Docker Compose configuration.

### 5. Stopping the Containers
To stop and remove the running containers, use:
docker-compose down

This command will stop all containers and remove them, along with any networks and volumes created by docker-compose up.


### Troubleshooting
If you encounter issues:

Ensure Docker Desktop is running.
Check for any port conflicts or container errors.
Review the Docker Compose logs for detailed error messages:

docker-compose logs
