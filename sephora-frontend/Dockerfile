# Use an official Alpine Linux image as the base image
FROM node:current-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Build the Vite.js project
RUN npm run build

# Specify the command to run your application
CMD [ "npm", "run", "preview" ]
