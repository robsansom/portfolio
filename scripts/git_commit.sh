#!/bin/bash

# Script for committing changes and deploying to GitHub Pages
# This is a wrapper that calls the main update-site.sh script

echo "Starting git commit and deploy..."

# Check if we're in the git repository
if [ ! -d ".git" ]; then
    echo "Error: Must run this script from the root of the git repository"
    exit 1
fi

# Call the update script in the same directory
./scripts/update-site.sh 