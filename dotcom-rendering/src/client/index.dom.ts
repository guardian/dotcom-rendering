import './webpackPublicPath';
import { startup } from './startup';

void startup(
	'islands',
	() =>
		import(/* webpackMode: "eager" */ './islands').then(({ islands }) =>
			islands(),
		),
	{
		priority: 'critical',
	},
);

void startup(
	'relativeTime',
	() =>
		import(/* webpackMode: "lazy" */ './relativeTime').then(
			({ relativeTime }) => relativeTime(),
		),
	{
		priority: 'feature',
	},
);
