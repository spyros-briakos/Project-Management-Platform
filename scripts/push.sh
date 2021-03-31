#!/bin/sh
msg="$*"

git add .
git commit -m "$msg"
git push origin main
