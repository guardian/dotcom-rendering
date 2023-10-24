import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { StarRatingBlockComponent } from './StarRatingBlockComponent';

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export default {
	component: StarRatingBlockComponent,
	title: 'Components/StarRatingBlockComponent',
};

export const AllSizes = () => (
	<>
		<h1>Small</h1>
		<br />
		<StarRatingBlockComponent rating={3} size="small" />
		<br />
		<br />
		<h1>Medium</h1>
		<br />
		<StarRatingBlockComponent rating={3} size="medium" />
		<br />
		<br />
		<h1>Large</h1>
		<br />
		<StarRatingBlockComponent rating={3} size="large" />
	</>
);
AllSizes.storyName = 'All stars sizes';
AllSizes.decorators = [splitTheme(articleFormat)];
