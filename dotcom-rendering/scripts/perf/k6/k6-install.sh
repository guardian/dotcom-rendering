#!/bin/bash
VERSION=v0.47.0

download () {
	printf "Downloading $1 ...\n\n"
	wget https://github.com/grafana/k6/releases/download/$VERSION/$1
}

unameOS="$(uname -s)"
case "${unameOS}" in
    Linux*)     OS=Linux;;
    Darwin*)    OS=Mac;;
    *)          OS="UNKNOWN OS:$(unameOS)"
esac

if [[ $OS == "Linux" ]]; then
	LINUX_FILE=k6-$VERSION-linux-arm64.tar.gz
	download $LINUX_FILE
	tar -xvf $LINUX_FILE
	rm $LINUX_FILE
	printf "\nto run a test:\n./k6-$VERSION-linux-arm64/k6 run k6.mjs\n"
elif [[ $OS == "Mac" ]]; then
	MAC_FILE=k6-$VERSION-macos-arm64.zip
	download $MAC_FILE
	unzip $MAC_FILE
	rm $MAC_FILE
	printf "\nto run a test:\n./k6-$VERSION-macos-arm64/k6 run k6.mjs\n"
fi
