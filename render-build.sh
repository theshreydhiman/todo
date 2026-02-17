#!/usr/bin/env bash
set -e

# Install server dependencies
cd server
npm install

# Install client dependencies and build React app
cd ../client
npm install
npx react-scripts build

echo "Build complete!"
