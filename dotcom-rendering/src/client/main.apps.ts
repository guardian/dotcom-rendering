import { startup } from './startup';

/*************************************************************
 *
 * The following modules are bundled in the entry chunk,
 * so they can be run immediately, but we still want to report
 * on the duration of loading and evaluating them.
 *
 *************************************************************/

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

void startup(
	'islands',
	() => import('./islands/islands').then(({ islands }) => islands()),
	{
		priority: 'critical',
	},
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
		import('./newsletterEmbedIframe').then(({ newsletterEmbedIframe }) =>
			newsletterEmbedIframe(),
		),
	{ priority: 'feature' },
);

void startup(
	'initDiscussion',
	() => import('./discussion').then(({ discussion }) => discussion()),
	{ priority: 'feature' },
);
