import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';

import { BootReact } from '@root/src/web/components/BootReact';

const init = (): Promise<void> => {
	const {
		data: { CAPI, NAV },
	} = window.guardian.app;

	// Partially hydrate the client using a combination of islands and portals
	BootReact({ CAPI, NAV });

	return Promise.resolve();
};

// TODO remove this
if (module.hot) {
	module.hot.accept();
}

startup('react', null, init);

try {
	if (
		!window.guardian.config.page.isDev &&
		window.guardian.config.switches.weAreHiring
	) {
		window.console.log(
			'\n' +
				'%cHello.\n' +
				'\n' +
				'%cWe are hiring – ever thought about joining us? \n' +
				'%chttps://workforus.theguardian.com/careers/product-engineering%c \n' +
				'\n',
			'font-family: Georgia, serif; font-size: 32px; color: #052962',
			'font-family: Georgia, serif; font-size: 16px; color: #767676',
			'font-family: Helvetica Neue, sans-serif; font-size: 11px; text-decoration: underline; line-height: 1.2rem; color: #767676',
			'',
		);
	}
} catch (e) {
	/* do nothing */
}
