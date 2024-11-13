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
	'islands',
	() =>
		import(/* webpackMode: "eager" */ './islands/islands').then(
			({ islands }) => islands(),
		),
	{
		priority: 'critical',
	},
);
