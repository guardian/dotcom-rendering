import dynamicImportPolyfill from 'dynamic-import-polyfill';
import { startup } from '../startup';

// Provides an import function to use for dynamic imports. **Only works on
// browsers that cut the mustard (support modules).**
const initialiseDynamicImport = () => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-implied-eval
		window.guardianPolyfilledImport = new Function(
			'url',
			`return import(url)`,
		) as (url: string) => Promise<any>;
	} catch (e) {
		dynamicImportPolyfill.initialize({
			importFunctionName: 'guardianPolyfilledImport', // must be a direct property of the window
		});
	}
};

const init = (): Promise<void> => {
	window.guardianPolyfilledImport = (url: string) =>
		Promise.reject(
			new Error(`import not polyfilled; attempted import(${url})`),
		);

	return Promise.resolve(initialiseDynamicImport());
};

startup('dynamicImport', null, init);
