#!/bin/sh

branch_name=$(git symbolic-ref --short HEAD 2> nul)
if [ "$branch_name" = "main" ] || [ "$branch_name" = "master" ]; then
  echo "Error: You cannot commit directly to the main/master branch."
  exit 1
fi