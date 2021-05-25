import { Design, Display, Pillar } from '@guardian/types';

import { Format } from './Card.Format.stories';

import { Card } from './Card';

export default {
	component: Card,
	title: 'Components/Card/Designs',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

const Review = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Review,
	},
	'Review',
);

const Interview = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Interview,
	},
	'Interview',
);

const PhotoEssay = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.PhotoEssay,
	},
	'PhotoEssay',
);

const Feature = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Feature,
	},
	'Feature',
);

const Article = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Article',
);

const Immersive = Format(
	{
		display: Display.Immersive,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Immersive',
);

const Showcase = Format(
	{
		display: Display.Showcase,
		theme: Pillar.News,
		design: Design.Article,
	},
	'Showcase',
);

const Editorial = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Editorial,
	},
	'Editorial',
);

const Interactive = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Interactive,
	},
	'Interactive',
);

const MatchReport = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.MatchReport,
	},
	'MatchReport',
);

const Media = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Media,
	},
	'Media',
);

const LiveBlog = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.LiveBlog,
	},
	'LiveBlog',
);

const DeadBlog = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.DeadBlog,
	},
	'DeadBlog',
);

const PrintShop = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.PrintShop,
	},
	'PrintShop',
);

const Comment = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Comment,
	},
	'Comment',
);

const Recipe = Format(
	{
		display: Display.Standard,
		theme: Pillar.News,
		design: Design.Recipe,
	},
	'Recipe',
);

export {
	Review,
	Interview,
	Comment,
	PhotoEssay,
	Feature,
	Article,
	Immersive,
	Showcase,
	Editorial,
	Interactive,
	MatchReport,
	Media,
	LiveBlog,
	DeadBlog,
	PrintShop,
	Recipe,
};
