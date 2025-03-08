#!/bin/bash

# Script to restore to the stable version tagged as STABLE_RESTORE_POINT
# Usage: ./scripts/restore-stable.sh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Restoring to stable version...${NC}"

# Check if we're in the git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Must run this script from the root of the git repository${NC}"
    exit 1
fi

# Stash any current changes
echo -e "${YELLOW}📦 Stashing any current changes...${NC}"
git stash

# Checkout the stable tag
echo -e "${YELLOW}🔄 Checking out stable version...${NC}"
git checkout STABLE_RESTORE_POINT

# Create a new branch from this point if needed
echo -e "${YELLOW}🌿 Creating a new branch from stable version...${NC}"
read -p "Create a new branch? (y/n): " create_branch
if [[ $create_branch == "y" || $create_branch == "Y" ]]; then
    read -p "Enter branch name: " branch_name
    git checkout -b "$branch_name"
    echo -e "${GREEN}✅ Created new branch: $branch_name${NC}"
fi

echo -e "${GREEN}✅ Successfully restored to stable version!${NC}"
echo -e "${YELLOW}Note: You are now in a 'detached HEAD' state unless you created a new branch.${NC}"
echo -e "${YELLOW}To update gh-pages with this version, run: git push -f origin HEAD:gh-pages${NC}" 