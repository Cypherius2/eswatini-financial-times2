cat > setup.sh << 'EOF'
#!/bin/bash

echo "Setting up Eswatini Financial Times project..."

Check if Node.js is installed
if ! command -v node &> /dev/null; then
echo "Node.js is not installed. Please install Node.js first."
exit 1
fi

Check if MongoDB is running (optional)
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

Create uploads directory
mkdir -p server/uploads

Copy environment file
if [ ! -f .env ]; then
cp .env.example .env
echo "Please edit the .env file with your configuration"
fi

echo "Setup complete!"
echo "Run 'npm run dev' to start all development servers"
EOF

#Make the setup script executable
chmod +x setup.sh

#Create .gitignore
cat > .gitignore << 'EOF'

Dependencies
node_modules/
*/node_modules/

Production builds
dist/
build/
*/dist/
*/build/

Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

Logs
logs
.log
npm-debug.log
yarn-debug.log*
yarn-error.log*

Runtime data
pids
*.pid
*.seed
*.pid.lock

Coverage directory used by tools like istanbul
coverage/
*.lcov

nyc test coverage
.nyc_output

Dependency directories
jspm_packages/

Optional npm cache directory
.npm

Optional eslint cache
.eslintcache

Optional REPL history
.node_repl_history

Output of 'npm pack'
*.tgz

Yarn Integrity file
.yarn-integrity

dotenv environment variables file
.env

parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

next.js build output
.next

nuxt.js build output
.nuxt

vuepress build output
.vuepress/dist

Serverless directories
.serverless/

FuseBox cache
.fusebox/

DynamoDB Local files
.dynamodb/

TernJS port file
.tern-port

Stores VSCode versions used for testing VSCode extensions
.vscode-test

Uploads
server/uploads/*
!server/uploads/.gitkeep

OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

#Create an empty gitkeep for uploads
touch server/uploads/.gitkeep

echo "Project structure created successfully!"
echo "Run './setup.sh' to install dependencies and set up the project."