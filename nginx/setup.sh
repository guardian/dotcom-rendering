#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NGINX_HOME=$(nginx -V 2>&1 | grep 'configure arguments:' | sed 's#.*conf-path=\([^ ]*\)/nginx\.conf.*#\1#g')

echo "🌏 This script will now attempt to install the nginx config for this project."
echo "🌍 This script needs root access to configure nginx, please enter your sudo password if prompted"
sudo mkdir -p $NGINX_HOME/sites-enabled
sudo ln -fs $DIR/dotcom-rendering.conf $NGINX_HOME/sites-enabled/dotcom-rendering.conf

if [[ $(sudo lsof -iTCP:443 -sTCP:LISTEN ) ]];
then
  echo "🤖 Attempting to restart nginx."
  sudo nginx -s reload
else
  echo "🚒 NGINX is not running."
fi
echo "🌎 Succesfully installed config."
