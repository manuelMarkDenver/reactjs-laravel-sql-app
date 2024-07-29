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

```bash
[git clone https://github.com/your-username/your-repo.git](https://github.com/manuelMarkDenver/reactjs-laravel-sql-app.git)
cd your-repo

2. Build the Containers
Use Docker Compose to build the Docker containers defined in your docker-compose.yml file:

```bash
docker-compose build
