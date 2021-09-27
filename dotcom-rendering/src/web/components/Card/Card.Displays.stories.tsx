import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { Format } from './Card.Format.stories';

import { Card } from './Card';

export default {
	component: Card,
	title: 'Components/Card/Displays',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

const Standard = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
	},
	'Standard',
);

const Showcase = Format(
	{
		display: ArticleDisplay.Showcase,
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
	},
	'Showcase',
);

const Immersive = Format(
	{
		display: ArticleDisplay.Immersive,
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
	},
	'Immersive',
);

export { Immersive, Showcase, Standard };
