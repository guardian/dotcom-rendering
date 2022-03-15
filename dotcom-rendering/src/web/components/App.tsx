import { log } from '@guardian/libs';

let renderCount = 0;
export const App = () => {
	log('dotcom', `App.tsx render #${(renderCount += 1)}`);

	return null;
};
