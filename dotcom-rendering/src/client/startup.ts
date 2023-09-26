import { log } from '@guardian/libs';
import type { ScheduleOptions } from '../lib/scheduler';
import { schedule } from '../lib/scheduler';

const isPolyfilled = new Promise<void>((resolve) => {
	if (window.guardian.mustardCut || window.guardian.polyfilled) {
		return resolve();
	}
	window.guardian.onPolyfilledCallbacks.push(resolve);
});

export const startup = async (
	name: string,
	task: () => Promise<unknown>,
	options: ScheduleOptions = {
		priority: 'critical',
	},
): Promise<void> => {
	await isPolyfilled;
	log('dotcom', `🎬 booting ${name}`);
	await schedule(name, task, options);
	log('dotcom', `🥾 booted ${name}`);
};
