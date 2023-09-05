#!/bin/bash
mkdir k6
cd k6
wget https://github.com/grafana/k6/releases/download/v0.46.0/k6-v0.46.0-linux-arm64.tar.gz
tar -xvf k6-v0.46.0-linux-arm64.tar.gz
cd k6-v0.46.0-linux-arm64
echo "to run a test ./k6 run ../../k6.js"
