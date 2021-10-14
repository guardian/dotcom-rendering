import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

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
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Review,
	},
	'Review',
	0, // star rating
);

const Interview = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Interview,
	},
	'Interview',
);

const PhotoEssay = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.PhotoEssay,
	},
	'PhotoEssay',
);

const Feature = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Feature,
	},
	'Feature',
);

const Article = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
	},
	'Article',
);

const Letter = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Letter,
	},
	'Letter',
);

const Quiz = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Quiz,
	},
	'Quiz',
);

const Editorial = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Editorial,
	},
	'Editorial',
);

const Interactive = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Interactive,
	},
	'Interactive',
);

const MatchReport = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.MatchReport,
	},
	'MatchReport',
);

const Media = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Media,
	},
	'Media',
);

const LiveBlog = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.LiveBlog,
	},
	'LiveBlog',
);

const DeadBlog = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.DeadBlog,
	},
	'DeadBlog',
);

const PrintShop = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.PrintShop,
	},
	'PrintShop',
);

const Comment = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Comment,
	},
	'Comment',
);

const Recipe = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Recipe,
	},
	'Recipe',
);

const Analysis = Format(
	{
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.News,
		design: ArticleDesign.Analysis,
	},
	'Analysis',
);

export {
	Review,
	Interview,
	Comment,
	PhotoEssay,
	Feature,
	Article,
	Letter,
	Quiz,
	Editorial,
	Interactive,
	MatchReport,
	Media,
	LiveBlog,
	DeadBlog,
	PrintShop,
	Recipe,
	Analysis,
};
