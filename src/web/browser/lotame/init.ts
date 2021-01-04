import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';

const shouldServeLotame = (window: Window) => {
	const geo = window.localStorage.getItem('gu.geolocation');
	if (geo === null) {
		return false;
	}
	return !['US', 'CA', 'AU', 'NZ'].includes(JSON.parse(geo).value);
};

// Loads user tracking (ad segment) data, which is then used to
// drive personalised ads for our 'Ozone' ads.
const init = (): Promise<void> => {
	try {
		((document, window) => {
			if (shouldServeLotame(window)) {
				const script = document.createElement('script');
				script.src = 'https://tags.crwdcntrl.net/c/12666/cc.js';
				document.body.appendChild(script);
			}
		})(document, window);
	} catch (e) {
		if (window.guardian.config.stage === 'DEV') {
			throw e;
		}
	}
	return Promise.resolve();
};

startup('lotame', null, init);
