import React from 'react';
import * as emotionReact from '@emotion/react';

let hasAutomatBeenSet = false;

export const setAutomat = () => {
	if (!hasAutomatBeenSet) {
		window.guardian.automat = {
			react: React,
			emotionReact,
		};
		hasAutomatBeenSet = true;
	}
};
