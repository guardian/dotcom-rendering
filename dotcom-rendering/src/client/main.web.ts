import { adaptSite, shouldAdapt } from './adaptiveSite';
import { startup } from './startup';
import { maybeSIndicatorCapiKey } from './userFeatures/cookies/sIndicatorCapiKey';

void (async () => {
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
		() => import('./bootCmp').then(({ bootCmp }) => bootCmp('Web')),
		{
			priority: 'critical',
		},
	);

	void startup(
		'recordInitialPageEvents',
		() =>
			import('./ophan/recordInitialPageEvents').then(
				({ recordInitialPageEvents }) => recordInitialPageEvents('Web'),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'sentryLoader',
		() =>
			import('./sentryLoader/sentryLoader').then(({ sentryLoader }) =>
				sentryLoader(),
			),
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
			import('./abTesting').then(({ initWindowABTesting }) =>
				initWindowABTesting(),
			),
		{ priority: 'critical' },
	);

	void startup(
		'islands',
		() => import('./islands/islands').then(({ islands }) => islands()),
		{
			priority: 'critical',
		},
	);

	void startup(
		'poorPerformanceMonitoring',
		() =>
			import('./poorPerformanceMonitoring').then(
				({ recordPoorPerformance }) => recordPoorPerformance('Web'),
			),
		{
			priority: 'critical',
		},
	);

	void startup(
		'userFeatures',
		() =>
			import('./userFeatures/user-features').then(({ refresh }) =>
				refresh(),
			),
		{ priority: 'critical' },
	);

	/*************************************************************
	 *
	 * The following modules are lazy loaded,
	 * because they are lower priority and do not want to block
	 * the modules above on loading these.
	 *
	 *************************************************************/

	void startup(
		'atomIframe',
		() => import('./atomIframe').then(({ atomIframe }) => atomIframe()),
		{ priority: 'feature' },
	);

	void startup(
		'embedIframe',
		() => import('./embedIframe').then(({ embedIframe }) => embedIframe()),
		{ priority: 'feature' },
	);

	void startup(
		'newsletterEmbedIframe',
		() =>
			import('./newsletterEmbedIframe').then(
				({ newsletterEmbedIframe }) => newsletterEmbedIframe(),
			),
		{ priority: 'feature' },
	);

	void startup(
		'initDiscussion',
		() => import('./discussion').then(({ discussion }) => discussion()),
		{ priority: 'feature' },
	);

	if (maybeSIndicatorCapiKey) {
		void startup(
			'sIndicator',
			() => import('./sIndicator').then(({ sIndicator }) => sIndicator()),
			{ priority: 'feature' },
		);
	}
})();
