import './webpackPublicPath';
import { adaptSite, shouldAdapt } from './adaptiveSite';
import { setDeviceClassCookie } from './deviceDetection/iPadDetection';
import { startup } from './startup';
import { maybeSIndicatorCapiKey } from './userFeatures/cookies/sIndicatorCapiKey';

void (async () => {
	// Set device class cookie for iPadOS detection (runs immediately, before any SDC requests)
	setDeviceClassCookie();

	if (await shouldAdapt()) {
		adaptSite('Web');
	}

	/*************************************************************
	 *
	 * The following modules are bundled in the entry chunk,
	 * so they can be run immediately, but we still want to report
	 * on the duration of loading and evaluating them.
	 *
	 *************************************************************/

	void startup(
		'bootCmp',
		() =>
			import(/* webpackMode: "eager" */ './bootCmp').then(({ bootCmp }) =>
				bootCmp('Web'),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'recordInitialPageEvents',
		() =>
			import(
				/* webpackMode: "eager" */ './ophan/recordInitialPageEvents'
			).then(({ recordInitialPageEvents }) =>
				recordInitialPageEvents('Web'),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'sentryLoader',
		() =>
			import(
				/* webpackMode: "eager" */ './sentryLoader/sentryLoader'
			).then(({ sentryLoader }) => sentryLoader()),
		{
			priority: 'critical',
		},
	);

	/**
	 * window.guardian.modules.abTests needs to be added to the window ASAP
	 * so that other scripts on the page i.e. commercial can use it
	 *
	 * This will move to lib once we're happy with it
	 */
	void startup(
		'abTesting',
		() =>
			import(/* webpackMode: 'eager' */ './abTesting').then(
				({ initWindowABTesting }) => initWindowABTesting(),
			),
		{ priority: 'critical' },
	);

	void startup(
		'dynamicImport',
		() =>
			import(/* webpackMode: "eager" */ './dynamicImport').then(
				({ dynamicImport }) => dynamicImport(),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'islands',
		() =>
			import(/* webpackMode: "eager" */ './islands/islands').then(
				({ islands }) => islands(),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'poorPerformanceMonitoring',
		() =>
			import(
				/* webpackMode: "eager" */ './poorPerformanceMonitoring'
			).then(({ recordPoorPerformance }) => recordPoorPerformance('Web')),
		{
			priority: 'critical',
		},
	);

	void startup(
		'userFeatures',
		() =>
			import(
				/* webpackMode: 'eager' */ './userFeatures/user-features'
			).then(({ refresh }) => refresh()),
		{ priority: 'critical' },
	);

	/*************************************************************
	 *
	 * The following modules are lazy loaded,
	 * because they are lower priority and do not want to block
	 * the modules above on loading these.
	 *
	 * We are not assigning chunk name to allow Webpack
	 * to optimise chunking based on its algorithm.
	 *
	 *************************************************************/

	void startup(
		'atomIframe',
		() =>
			import(
				/* webpackMode: 'lazy' */
				'./atomIframe'
			).then(({ atomIframe }) => atomIframe()),
		{ priority: 'feature' },
	);

	void startup(
		'embedIframe',
		() =>
			import(
				/* webpackMode: 'lazy' */
				'./embedIframe'
			).then(({ embedIframe }) => embedIframe()),
		{ priority: 'feature' },
	);

	void startup(
		'newsletterEmbedIframe',
		() =>
			import(
				/* webpackMode: 'lazy' */
				'./newsletterEmbedIframe'
			).then(({ newsletterEmbedIframe }) => newsletterEmbedIframe()),
		{ priority: 'feature' },
	);

	void startup(
		'initDiscussion',
		() =>
			import(
				/* webpackMode: 'lazy' */
				'./discussion'
			).then(({ discussion }) => discussion()),
		{ priority: 'feature' },
	);

	if (maybeSIndicatorCapiKey) {
		void startup(
			'sIndicator',
			() =>
				import(
					/* webpackMode: 'lazy' */
					'./sIndicator'
				).then(({ sIndicator }) => sIndicator()),
			{ priority: 'feature' },
		);
	}
})();
