import React from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import * as emotionReact from '@emotion/react';
import * as emotionReactJsxRuntime from '@emotion/react/jsx-runtime';

let hasAutomatBeenSet = false;

export const setAutomat = () => {
	if (!hasAutomatBeenSet) {
		window.guardian.automat = {
			react: React,
			preact: React,
			emotionCore,
			emotionReact,
			emotionReactJsxRuntime,
			emotionTheming,
			emotion,
		};
		hasAutomatBeenSet = true;
	}
};
