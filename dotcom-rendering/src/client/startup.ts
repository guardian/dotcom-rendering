import { log } from '@guardian/libs';
import { initPerf } from './initPerf';

const measure = (name: string, task: () => Promise<void>): void => {
	const { start, end } = initPerf(name);

	start();

	task()
		// You could use 'finally' here to prevent this duplication but finally isn't supported
		// in Chrome 59 which is used by Cypress in headless mode so if you do it will
		// break the Cypress tests on CI
		// See: https://github.com/cypress-io/cypress/issues/2651#issuecomment-432698837
		.then(() => {
			end();
			log('dotcom', `🥾 Booted ${name} in ${end()}ms`);
		})
		.catch(() => {
			end();
			log('dotcom', `🤒 Failed to boot ${name} in ${end()}ms`);
		});
};

export const startup = (name: string, task: () => Promise<void>): void => {
	const measureMe = () => {
		measure(name, task.bind(null));
	};
	if (window.guardian.mustardCut || window.guardian.polyfilled) {
		measureMe();
	} else {
		window.guardian.queue.push(measureMe);
	}
};
