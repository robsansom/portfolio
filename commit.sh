#!/bin/bash

# Function to display script usage
show_usage() {
    echo "Usage: $0 \"commit message\""
    echo "Example: $0 \"feat: add new button component\""
}

# Check if commit message was provided
if [ $# -eq 0 ]; then
    echo "Error: No commit message provided"
    show_usage
    exit 1
fi

# Store the commit message
COMMIT_MESSAGE="$1"

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Function to check if there are changes to commit
check_changes() {
    if [ -z "$(git status --porcelain)" ]; then
        echo "No changes to commit"
        return 1
    fi
    return 0
}

# Function to ensure we're on the right branch
ensure_branch() {
    local branch=$1
    echo "Switching to $branch branch..."
    git checkout "$branch" || handle_error "Failed to switch to $branch branch"
}

# Main workflow
echo "Starting deployment process..."

# First, commit and push to main
ensure_branch "main"

# Check if there are changes to commit
if check_changes; then
    echo "Committing changes to main..."
    git add . || handle_error "Failed to stage changes"
    git commit -m "$COMMIT_MESSAGE" || handle_error "Failed to commit changes"
    git push origin main || handle_error "Failed to push to main"
fi

# Then update gh-pages
echo "Updating gh-pages branch..."
ensure_branch "gh-pages"

# Check if there's a merge in progress
if [ -f .git/MERGE_HEAD ]; then
    echo "Detected unfinished merge, cleaning up..."
    git merge --abort
fi

# Merge main into gh-pages
echo "Merging main into gh-pages..."
if git merge main -m "Merge main into gh-pages: $COMMIT_MESSAGE"; then
    git push origin gh-pages || handle_error "Failed to push to gh-pages"
else
    handle_error "Merge conflict occurred. Please resolve manually"
fi

# Switch back to main
ensure_branch "main"

echo "Deployment completed successfully!"
