import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { type Props, StarRating } from './StarRating';

const meta = {
	component: StarRating,
	title: 'Components/StarRating',
	render: (args) => <AllRatings {...args} />,
	parameters: {
		chromatic: {
			disableSnapshot: true,
		},
	},
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof StarRating>;

const Ratings = [0, 1, 2, 3, 4, 5] as const;

const AllRatings = (args: Props) => {
	return Ratings.map((x) => <StarRating {...args} rating={x} key={x} />);
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

export const StarsWithSmallPadding: Story = {
	args: {
		size: 'large',
		paddingSize: 'small',
	},
};

export const StarsWithMediumPadding: Story = {
	args: {
		size: 'large',
		paddingSize: 'medium',
	},
};

export const StarsWithLargePadding: Story = {
	args: {
		size: 'large',
		paddingSize: 'large',
	},
};

export const StarsWithAlternativeTheme: Story = {
	args: {
		size: 'large',
		useAlternativeTheme: true,
	},
};
