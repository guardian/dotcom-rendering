import { log } from '@guardian/libs';
import { initPerf } from './initPerf';

const measure = (name: string, task: () => Promise<void>): void => {
	const { start, end } = initPerf(name);

	start();

	task()
		.then(() => {
			const duration = end();
			log('dotcom', `🥾 Booted ${name} in ${duration}ms`);
		})
		.catch(() => {
			const duration = end();
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
