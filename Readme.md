
To run a ReactJS application on Docker Desktop and integrate it with a Strapi API running in another container, follow these steps:

Step 1: Set Up Your ReactJS Application
Create React App (if you don't have one already):

bash

npx create-react-app my-react-app
cd my-react-app
Create a Dockerfile in the root of your React app:

Dockerfile

# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install a simple server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build"]
Create a .dockerignore file to prevent unnecessary files from being copied into the Docker image:


node_modules
build
.dockerignore
Dockerfile
Step 2: Set Up Your Strapi Application
Create a Strapi app (if you don't have one already):

bash

npx create-strapi-app my-strapi-app --quickstart
cd my-strapi-app
Create a Dockerfile in the root of your Strapi app:

Dockerfile

# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 1337

# Start the Strapi application
CMD ["npm", "run", "develop"]
Create a .dockerignore file to prevent unnecessary files from being copied into the Docker image:


node_modules
build
.dockerignore
Dockerfile
Step 3: Set Up Docker Compose
Create a docker-compose.yml file in the root directory (above both the React and Strapi directories):

yaml

version: '3'
services:
react-app:
build:
context: ./my-react-app
ports:
- "3000:3000"
depends_on:
- strapi-api

strapi-api:
build:
context: ./my-strapi-app
ports:
- "1337:1337"
environment:
DATABASE_CLIENT: sqlite
DATABASE_FILENAME: ./data.db
APP_KEYS: your_app_keys
API_TOKEN_SALT: your_api_token_salt
ADMIN_JWT_SECRET: your_admin_jwt_secret
JWT_SECRET: your_jwt_secret

Step 4: Update React Application to Call Strapi API
Update the React application to make API calls to the Strapi API. For example, in your React component:

javascript

useEffect(() => {
fetch('http://localhost:1337/api/your-endpoint')
.then(response => response.json())
.then(data => setData(data))
.catch(error => console.error('Error fetching data:', error));
}, []);


Step 5: Build and Run Containers
Build and run the containers using Docker Compose:

bash

docker-compose up --build
This command builds the Docker images for both the React and Strapi applications and starts the containers.

Step 6: Access the Applications
React Application: Open your browser and navigate to http://localhost:3000.
Strapi Application: Open your browser and navigate to http://localhost:1337/admin to access the Strapi admin panel.
This setup allows you to develop and run a ReactJS frontend and a Strapi backend using Docker containers, ensuring that both applications are isolated and easy to manage.