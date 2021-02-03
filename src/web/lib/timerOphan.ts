import { record } from '@root/src/web/browser/ophan/ophan';
import { Timer } from './timer';

export const createOphanTimer = (name: string) =>
	new Timer(name, (measureName, measurement) => {
		record({
			component: measureName,
			value: measurement,
		});
	});
