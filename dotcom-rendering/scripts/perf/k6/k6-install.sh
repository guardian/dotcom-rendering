#!/bin/bash
VERSION=v0.47.0
LINUX_VERSION=k6-$VERSION-linux-arm64.tar.gz
MAC_VERSION=k6-$VERSION-macos-arm64.zip
echo "Downloading linux-arm64 binary"
wget https://github.com/grafana/k6/releases/download/$VERSION/$LINUX_VERSION
tar -xvf $LINUX_VERSION
rm $LINUX_VERSION
echo "Downloading macos-arm64 binary"
wget https://github.com/grafana/k6/releases/download/$VERSION/$MAC_VERSION
unzip $MAC_VERSION
rm $MAC_VERSION
echo "to run a test:"
echo "./k6-$VERSION-macos-arm64/k6 run k6.js"
echo "or"
echo "./k6-$VERSION-linux-arm64/k6 run k6.js"
