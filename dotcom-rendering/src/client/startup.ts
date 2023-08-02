import { log } from '@guardian/libs';
import { startPerformanceMeasure } from '../lib/startPerformanceMeasure';

const measure = (name: string, task: () => Promise<void>): void => {
	try {
		const { endPerformanceMeasure } = startPerformanceMeasure(
			'dotcom',
			name,
		);

		task()
			.then(() => {
				const duration = endPerformanceMeasure();
				log('dotcom', `🥾 Booted ${name} in ${duration}ms`);
			})
			.catch(() => {
				const duration = endPerformanceMeasure();
				log('dotcom', `🤒 Failed to boot ${name} in ${duration}ms`);
			});
	} catch (error) {
		// performance APIs are unsupported or broken…
	}
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
