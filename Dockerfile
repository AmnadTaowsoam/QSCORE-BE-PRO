# Assuming your Dockerfile looks something like this:
    FROM node:18-slim
    WORKDIR /app
    
    # Copy package.json and other necessary files
    COPY package*.json ./
    COPY yarn.lock .
    
    # Install dependencies
    RUN yarn install --frozen-lockfile
    
    # Copy your source files
    COPY . .
    
    # Make sure to copy the .env file
    COPY .env ./
    
    # Non-root user setup
    RUN chown -R node:node /app
    USER node
    
    EXPOSE 3000
    CMD ["node", "src/app.js"]
    