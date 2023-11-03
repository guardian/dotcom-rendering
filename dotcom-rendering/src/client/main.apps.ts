import './webpackPublicPath';
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
		import(/* webpackMode: "eager" */ './sentryLoader/sentryLoader').then(
			({ sentryLoader }) => sentryLoader(),
		),
	{
		priority: 'critical',
	},
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
