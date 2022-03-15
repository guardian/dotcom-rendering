import { useEffect } from 'react';

import { log } from '@guardian/libs';

import { incrementAlreadyVisited } from '../lib/alreadyVisited';

let renderCount = 0;
export const App = () => {
	log('dotcom', `App.tsx render #${(renderCount += 1)}`);

	useEffect(() => {
		incrementAlreadyVisited();
	}, []);

	return null;
};
