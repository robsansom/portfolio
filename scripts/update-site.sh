#!/bin/bash

# Script to update the site and push changes to GitHub Pages
# Usage: ./scripts/update-site.sh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking repository status...${NC}"

# Check if we're in the git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Must run this script from the root of the git repository${NC}"
    exit 1
fi

# Run the repository structure check first
if [ -f "scripts/check-git-structure.sh" ]; then
    bash scripts/check-git-structure.sh
fi

echo -e "\n${YELLOW}📝 Enter a brief description of your changes:${NC}"
read commit_message

echo -e "\n${YELLOW}📦 Adding changes...${NC}"
git add .

echo -e "\n${YELLOW}💾 Committing changes...${NC}"
git commit -m "$commit_message"

echo -e "\n${YELLOW}🚀 Pushing to GitHub Pages...${NC}"
git push origin gh-pages

echo -e "\n${GREEN}✅ Done! Changes should be live in a few minutes.${NC}"
echo -e "${YELLOW}Remember to hard refresh your browser (Cmd/Ctrl + Shift + R)${NC}" 