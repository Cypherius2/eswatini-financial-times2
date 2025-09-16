#!/bin/bash

echo "Setting up Eswatini Financial Times project..."

Check if Node.js is installed
if ! command -v node &> /dev/null; then
echo "Node.js is not installed. Please install Node.js first."
exit 1
fi

#Check if MongoDB is running (optional)
echo "Please ensure MongoDB is running on your system"

Install dependencies
echo "Installing root dependencies..."
npm install

echo "Installing client dependencies..."
cd client && npm install && cd ..

echo "Installing server dependencies..."
cd server && npm install && cd ..

echo "Installing admin dashboard dependencies..."
cd admin-dashboard && npm install && cd ..

#Create uploads directory
mkdir -p server/uploads

#Copy environment file
if [ ! -f .env ]; then
cp .env.example .env
echo "Please edit the .env file with your configuration"
fi

echo "Setup complete!"
echo "Run 'npm run dev' to start all development servers"
