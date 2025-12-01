#!/bin/bash
# Build and serve the React app

echo "Building React app..."
npm install
npm run build

echo "Installing serve..."
npm install -g serve

echo "Starting server on port 8080..."
serve -s dist -l 8080
