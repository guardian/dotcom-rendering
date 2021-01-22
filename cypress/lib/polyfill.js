let polyfill;

export const getPolyfill = () => {
	const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
	cy.request(polyfillUrl).then((response) => {
		polyfill = response.body;
	});
};

export const polyfillFetch = (win) => {
	delete win.fetch;
	// since the application code does not ship with a polyfill
	// load a polyfilled "fetch" from the test
	win.eval(polyfill);
	win.fetch = win.unfetch;
};
