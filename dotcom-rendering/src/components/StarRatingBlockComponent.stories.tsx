import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../lib/articleFormat';
import { StarRatingBlockComponent } from './StarRatingBlockComponent';

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const meta = {
	component: StarRatingBlockComponent,
	title: 'Components/StarRatingBlockComponent',
	decorators: [splitTheme([articleFormat])],
} satisfies Meta<typeof StarRatingBlockComponent>;

export default meta;
type Story = StoryObj<typeof StarRatingBlockComponent>;

export const AllSizes: Story = {
	name: 'All stars sizes',
	render: () => (
		<>
			<h1>Small</h1>
			<br />
			<StarRatingBlockComponent rating={3} size="small" />
			<br />
			<br />
			<h1>medium</h1>
			<br />
			<StarRatingBlockComponent rating={3} size="medium" />
			<br />
			<br />
			<h1>Large</h1>
			<br />
			<StarRatingBlockComponent rating={3} size="large" />
		</>
	),
};
