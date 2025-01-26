#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create necessary directories if they don't exist
echo "Creating deployment directories..."
mkdir -p dist

# Copy files to deployment directory
echo "Copying files to deployment directory..."
cp -r dist/* /path/to/hostinger/public_html/
cp .htaccess /path/to/hostinger/public_html/

# Set permissions
echo "Setting permissions..."
find /path/to/hostinger/public_html/ -type d -exec chmod 755 {} \;
find /path/to/hostinger/public_html/ -type f -exec chmod 644 {} \;

# Ensure index.html is readable
chmod 644 /path/to/hostinger/public_html/index.html

echo "Deployment complete!" 