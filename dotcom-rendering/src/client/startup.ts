import { log } from '@guardian/libs';
import { createTimer } from './timer';

const measure = (name: string, task: () => Promise<void>): void => {
	const timer = createTimer('dotcom', name)('start');

	task()
		.then(() => {
			const duration = timer('end');
			log('dotcom', `🥾 Booted ${name} in ${duration}ms`);
		})
		.catch(() => {
			const duration = timer('end');
			log('dotcom', `🤒 Failed to boot ${name} in ${duration}ms`);
		});
};

export const startup = (name: string, task: () => Promise<void>): void => {
	const measureMe = () => {
		measure(name, task);
	};
	if (window.guardian.mustardCut || window.guardian.polyfilled) {
		measureMe();
	} else {
		window.guardian.queue.push(measureMe);
	}
};
