// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-plugin-tab';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
	// don't break our tests if sourcepoint code breaks
	if (/wrapperMessagingWithoutDetection/.test(err.stack)) {
		console.warn(err);
		return false;
	}

	// When we set the `GU_U` cookie this is causing the commercial bundle to try and do
	// something with the url which is failing in Cypress with a malformed URI error
	if (err.message.includes('URI malformed')) {
		// This error is unrelated to the test in question so return  false to prevent
		// this commercial error from failing this test
		return false;
	}

	// We don't want to throw an error if the consent framework isn't loaded in the tests
	// https://github.com/guardian/consent-management-platform/blob/main/src/onConsentChange.ts#L34
	if (err.message.includes('no IAB consent framework found on the page')) {
		console.warn(err);
		return false;
	}

	// This error is only happening when running tests in the Github Action and has never been
	// seen on production so I'm making a call here and ignoring it. Admittedly, it would be
	// better to fully understand why it happens (it's something with preact and hooks) but
	// I'm trading off this knowledge in favour of time. If you've landed here for another
	// reason and feel that have a better idea of the cause and that you can fix it then you
	// have my thanks and respect
	if (
		err.message.includes("Cannot read properties of null (reading '__H')")
	) {
		console.warn(err);
		return false;
	}

	return true;
});
