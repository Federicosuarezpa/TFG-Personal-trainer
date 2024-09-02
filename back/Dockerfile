FROM node:20.16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src ./src
COPY uploads ./uploads

COPY .env-docker ./.env

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
