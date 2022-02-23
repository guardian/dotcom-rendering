// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { partition } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import Standard from 'components/layout/standard';
import { article, matchReport, review } from 'fixtures/item';
import { renderAll } from 'renderer';

// ----- Stories ----- //

const display = ArticleDisplay.Standard;

export const Article = (): React.ReactNode => {
	return (
		<Standard item={article}>
			{renderAll(
				{
					theme: ArticlePillar.News,
					design: ArticleDesign.Standard,
					display,
				},
				partition(article.body).oks,
			)}
		</Standard>
	);
};
Article.story = { name: 'Article' };

export const Review = (): React.ReactNode => {
	return (
		<Standard item={review}>
			{renderAll(
				{
					theme: ArticlePillar.Culture,
					design: ArticleDesign.Standard,
					display,
				},
				partition(review.body).oks,
			)}
		</Standard>
	);
};
Review.story = { name: 'Review' };

export const MatchReport = (): React.ReactNode => {
	return (
		<Standard item={matchReport}>
			{renderAll(
				{
					theme: ArticlePillar.Sport,
					design: ArticleDesign.MatchReport,
					display,
				},
				partition(matchReport.body).oks,
			)}
		</Standard>
	);
};
MatchReport.story = { name: 'Match Report' };

export default {
	title: 'AR/Layouts/Standard',
	decorators: [withKnobs],
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [
				breakpoints.mobile,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};
