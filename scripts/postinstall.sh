#!/bin/bash

# Automatically copy over required settings for vscode
if [ ! -f .vscode/settings.json ] ;
	then echo "No VSCode settings.json found. Copying from repo required settings..."  \
		 && cp .vscode/settings.json.required .vscode/settings.json ;
fi
