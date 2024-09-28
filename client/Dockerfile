# Step 1: Use an official Node.js image as the base image
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
# COPY . .

# Step 6: Expose the port that the React development server will use
EXPOSE 3000

# Step 7: Set the command to start the React development server
CMD ["npm", "start"]