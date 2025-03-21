#!/bin/bash

# Script to update the site and push changes to GitHub Pages
# Usage: ./scripts/update-site.sh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Files to exclude from deployment
EXCLUDE_FILES=".git .gitignore CNAME scripts README.md git_commit.sh"

echo -e "${YELLOW}🔍 Checking repository status...${NC}"

# Check if we're in the git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Must run this script from the root of the git repository${NC}"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Switch to main if not already on it
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}🔄 Switching to main branch...${NC}"
    git checkout main
fi

echo -e "\n${YELLOW}📝 Enter a brief description of your changes:${NC}"
read commit_message

echo -e "\n${YELLOW}📦 Adding changes...${NC}"
git add .

echo -e "\n${YELLOW}💾 Committing changes to main branch...${NC}"
git commit -m "$commit_message"

# Push changes to main
echo -e "\n${YELLOW}⬆️ Pushing changes to main branch...${NC}"
git push origin main

# Backup README from gh-pages branch if exists
echo -e "\n${YELLOW}📂 Managing deployment files...${NC}"
if git show-ref --verify --quiet refs/heads/gh-pages; then
    # If gh-pages branch exists, save its README if it exists
    git checkout gh-pages -- README.md 2>/dev/null || true
fi

# Switch to gh-pages branch
echo -e "\n${YELLOW}🔄 Switching to gh-pages branch...${NC}"
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    git pull origin gh-pages
else
    git checkout -b gh-pages
fi

# Copy all files from main branch
echo -e "${YELLOW}📋 Copying files from main branch...${NC}"
git checkout main -- .

# Remove excluded files
echo -e "${YELLOW}🗑️ Removing excluded files...${NC}"
for file in $EXCLUDE_FILES; do
    rm -rf "$file" 2>/dev/null || true
done

# Add all files and commit
echo -e "\n${YELLOW}📦 Adding deployment files...${NC}"
git add -A

echo -e "\n${YELLOW}💾 Committing to gh-pages branch...${NC}"
git commit -m "Deploy site: $commit_message"

# Push to GitHub Pages
echo -e "\n${YELLOW}🚀 Pushing to GitHub Pages...${NC}"
git push -f origin gh-pages

# Switch back to main branch
echo -e "\n${YELLOW}🔄 Switching back to main branch...${NC}"
git checkout main

echo -e "\n${GREEN}✅ Done! Changes should be live in a few minutes.${NC}"
echo -e "${GREEN}🌐 View your site at: https://robsansom.github.io/portfolio/${NC}"
echo -e "${YELLOW}💡 Remember to hard refresh your browser (Cmd/Ctrl + Shift + R)${NC}" 