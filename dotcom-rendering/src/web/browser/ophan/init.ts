import '../webpackPublicPath';
import { startup } from '../startup';
import { recordPerformance, sendOphanPlatformRecord } from './ophan';

// In Firefox this variable is undefined but in Chrome its set to a function
// Ophan keeps calling this function whenever it loads and it seems to be the one causing the Illegal Access error. I believe webkit is using this to possibly detect if the Browser is chrome?
window.webkitRequestFileSystem = undefined;

window.guardian = {};
window.guardian.config = window.guardianProxy.config;
window.guardian.queue = [];

// ophan-tracker-js runs code on Import that requires certain variables to be set in the window object to function. This import needs to happen after those variables have been set.
require('ophan-tracker-js');

const init = (): Promise<void> => {
	sendOphanPlatformRecord();
	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		recordPerformance();
		window.removeEventListener('load', load, false);
	});
	return Promise.resolve();
};

startup('ophan', null, init);
