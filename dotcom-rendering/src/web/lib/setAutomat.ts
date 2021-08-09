import React from 'react';

import * as emotionReact from '@emotion/react';
import * as emotionReactJsxRuntime from '@emotion/react/jsx-runtime';

let hasAutomatBeenSet = false;

export const setAutomat = () => {
	if (!hasAutomatBeenSet) {
		window.guardian.automat = {
			emotionReact,
			emotionReactJsxRuntime,
			react: React,
		};
		hasAutomatBeenSet = true;
	}
};
