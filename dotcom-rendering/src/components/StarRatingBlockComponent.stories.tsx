import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
	},
};

export const MediumStars: Story = {
	args: {
		size: 'medium',
	},
};

export const LargeStars: Story = {
	args: {
		size: 'large',
	},
};
