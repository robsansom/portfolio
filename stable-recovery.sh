#!/bin/bash
echo "Restoring to stable version..."
git checkout STABLE-BACKUP
git push -f origin STABLE-BACKUP:gh-pages
echo "✅ Site restored to stable version!"
echo "View your site at: https://robsansom.github.io/portfolio/" 