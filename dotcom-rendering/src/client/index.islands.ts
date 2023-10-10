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

window.location.search.startsWith('?manipulation=dom') &&
	void startup(
		'islands',
		() =>
			import(/* webpackMode: "lazy" */ './relativeTime').then(
				({ relativeTime }) => relativeTime(),
			),
		{
			priority: 'feature',
		},
	);
