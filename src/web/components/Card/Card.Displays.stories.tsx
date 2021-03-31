import { Design, Display, Pillar } from '@guardian/types';

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
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Standard',
);

const Showcase = Format(
	{
		display: Display.Showcase,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Showcase',
);

const Immersive = Format(
	{
		display: Display.Immersive,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Immersive',
);

export { Immersive, Showcase, Standard };
