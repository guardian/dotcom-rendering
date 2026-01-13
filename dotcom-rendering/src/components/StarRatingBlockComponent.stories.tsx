import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../lib/articleFormat';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import { StarRatingBlockComponent } from './StarRatingBlockComponent';

const meta = {
	component: StarRatingBlockComponent,
	title: 'Components/StarRatingBlockComponent',
	render: (args) => <AllRatings {...args} />,
	parameters: {
		chromatic: {
			disableSnapshot: true,
		},
	},
} satisfies Meta<typeof StarRatingBlockComponent>;

export default meta;
type Story = StoryObj<typeof StarRatingBlockComponent>;

const Ratings = [0, 1, 2, 3, 4, 5] as const;

type Props = {
	rating: Rating;
	size: RatingSizeType;
	isInStarRatingVariant?: boolean;
};

const AllRatings = (args: Props) => {
	return Ratings.map((x) => (
		<div key={x}>
			<StarRatingBlockComponent {...args} rating={x} />
		</div>
	));
};

export const SmallStars: Story = {
	args: {
		size: 'small',
		isInStarRatingVariant: true,
	},
};

export const MediumStars: Story = {
	args: {
		size: 'medium',
		isInStarRatingVariant: true,
	},
};

export const LargeStars: Story = {
	args: {
		size: 'large',
		isInStarRatingVariant: true,
	},
};

/* TODO: the below can be removed once the deprecated Star Rating component is removed. */
const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const AllSizes = () => (
	<>
		<h1>Small</h1>
		<br />
		<StarRatingBlockComponent rating={3} size="small" />
		<br />
		<br />
		<h1>Large</h1>
		<br />
		<StarRatingBlockComponent rating={3} size="large" />
	</>
);
AllSizes.storyName = 'Deprecated stars sizes';
AllSizes.decorators = [splitTheme([articleFormat])];
