FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the Next.js project files into the container
COPY . .

# Build the Next.js app using yarn
RUN yarn build

# Expose the port that the Next.js app will run on
EXPOSE 5089

# Start the Next.js app in production mode using yarn
CMD ["yarn", "start"]
