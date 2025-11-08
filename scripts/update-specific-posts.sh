#!/bin/bash

# This script will update each migrated blog post with properly formatted HTML
# Run the TypeScript script which will process posts one by one

cd /Users/dakthi/Downloads/nextjs/nextjs-lieuvo
npx tsx scripts/ai-format-posts.ts
