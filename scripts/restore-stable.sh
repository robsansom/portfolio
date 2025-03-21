#!/bin/bash

# Script to restore to the stable version in STABLE-BACKUP branch
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

# Checkout the stable branch
echo -e "${YELLOW}🔄 Checking out stable version...${NC}"
git checkout STABLE-BACKUP

# Push to gh-pages
echo -e "${YELLOW}🚀 Updating live site...${NC}"
git push -f origin STABLE-BACKUP:gh-pages

echo -e "${GREEN}✅ Site restored to stable version!${NC}"
echo -e "${GREEN}🌐 View your site at: https://robsansom.github.io/portfolio/${NC}" 