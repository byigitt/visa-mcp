# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Your app binds to stdout/stdin, so no port needs to be exposed.
# The `docker run -i` flag will be used to connect to the container's stdin.

# Define the command to run your app
CMD [ "pnpm", "start" ] 