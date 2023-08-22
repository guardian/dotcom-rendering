import dynamicImportPolyfill from 'dynamic-import-polyfill';

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

// Provides an import function to use for dynamic imports. **Designed for
// legacy browsers. Dynamic loads a ~4k bundle.**
const initialiseDynamicImportLegacy = async () => {
	const shimport = await import(
		/* webpackChunkName: "shimport" */ '@guardian/shimport'
	);
	shimport.initialise(); // note this adds a __shimport__ global
	window.guardianPolyfilledImport = shimport.load;
};

export const dynamicImport = (): Promise<void> => {
	window.guardianPolyfilledImport = (url: string) =>
		Promise.reject(
			new Error(`import not polyfilled; attempted import(${url})`),
		);

	if (window.guardian.mustardCut) {
		return Promise.resolve(initialiseDynamicImport());
	}

	return initialiseDynamicImportLegacy();
};
