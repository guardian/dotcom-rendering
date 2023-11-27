#!/bin/bash

# Automatically copy over required settings for vscode
if [ ! -f .vscode/settings.json ] ;
	then echo "No VSCode settings.json found. Copying from repo required settings..."  \
		 && cp .vscode/settings.json.required .vscode/settings.json ;
fi


# Ensure apps-rendering dependencies are installed
cd apps-rendering && \
	if [ \"$CI\" = true ];
		then yarn --frozen-lockfile ;
		else yarn ;
	fi
