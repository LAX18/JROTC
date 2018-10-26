#!/bin/bash
echo "Starting Send..."
echo "Commit name:"
read name
git add *
git commit -m "$name"
git push
echo "Sent!"