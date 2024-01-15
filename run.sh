#!/usr/bin/env sh

if [ "$1" = "" ]; then
# By default if you don't prepare any arguments it'll run in development mode.
  npx next dev
else
# Running application with prepared arguments as %*
  npm run $1
fi