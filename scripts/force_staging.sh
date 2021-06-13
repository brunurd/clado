#!/usr/bin/env bash

set -e

current_branch=$(git rev-parse --abbrev-ref HEAD)

branches=$(git branch | xargs echo)
if [[ $branches == *"staging"* ]]; then
  git branch -D staging
fi

git checkout -b staging
git push origin staging -f
git checkout "$current_branch"
git branch -D staging
