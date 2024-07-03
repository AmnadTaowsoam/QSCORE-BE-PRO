FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all the source files
COPY . .

# Non-root user setup
RUN chown -R node:node /app
USER node

# Expose the port
EXPOSE 8002  

# Command to run the application
CMD ["node", "src/app.js"]
