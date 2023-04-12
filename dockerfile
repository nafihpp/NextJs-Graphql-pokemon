# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Set the environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port on which the application will run
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "start"]
