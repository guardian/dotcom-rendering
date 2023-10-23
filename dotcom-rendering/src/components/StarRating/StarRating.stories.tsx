// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta } from '@storybook/react';
import {
	darkDecorator,
	lightDecorator,
} from '../../../.storybook/decorators/themeDecorator';
import { StarRating } from './StarRating';

// ----- Meta ----- //

const meta: Meta<typeof StarRating> = {
	title: 'components/StarRating',
	component: StarRating,
};

export default meta;

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};
// ----- Stories ----- //

export const AllSizeStars = () => (
	<>
		<h1>Small</h1>
		<br />
		<StarRating rating={3} size="small" />
		<br />
		<br />
		<h1>Medium</h1>
		<br />
		<StarRating rating={3} size="medium" />
		<br />
		<br />
		<h1>Large</h1>
		<br />
		<StarRating rating={3} size="large" />
	</>
);
AllSizeStars.storyName = 'All Sizes';
AllSizeStars.decorators = [lightDecorator(articleFormat)];

export const DarkAllSizes = () => AllSizeStars();
DarkAllSizes.storyName = 'All Sizes - Dark theme';
DarkAllSizes.decorators = [darkDecorator(articleFormat)];

export const SmallStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="small" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="small" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="small" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="small" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="small" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="small" />
	</>
);
SmallStory.storyName = 'Small Stars';
SmallStory.decorators = [lightDecorator(articleFormat)];

export const DarkSmall = () => SmallStory();
DarkSmall.storyName = 'Small Stars - Dark theme ';
DarkSmall.decorators = [darkDecorator(articleFormat)];

export const MediumStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="medium" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="medium" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="medium" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="medium" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="medium" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="medium" />
	</>
);
MediumStory.storyName = 'Medium stars';
MediumStory.decorators = [lightDecorator(articleFormat)];

export const DarkMedium = () => MediumStory();
DarkMedium.storyName = 'Medium Stars - Dark theme ';
DarkMedium.decorators = [darkDecorator(articleFormat)];

export const LargeStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="large" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="large" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="large" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="large" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="large" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="large" />
	</>
);
LargeStory.storyName = 'Large stars';
LargeStory.decorators = [lightDecorator(articleFormat)];

export const DarkLarge = () => LargeStory();
DarkLarge.storyName = 'Large Stars - Dark theme ';
DarkLarge.decorators = [darkDecorator(articleFormat)];
