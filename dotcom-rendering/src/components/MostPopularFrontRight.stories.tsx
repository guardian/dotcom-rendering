import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { trails } from '../../fixtures/manual/trails';
import { MostPopularFrontRight } from './MostPopularFrontRight';

const meta = {
	component: MostPopularFrontRight,
	title: 'Components/MostPopularFrontRight',
	decorators: [rightColumnDecorator],
	render: (args) => <MostPopularFrontRight {...args} />,
} satisfies Meta<typeof MostPopularFrontRight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MostViewed = {
	args: {
		heading: 'Most viewed',
		trails: trails.slice(0, 10),
	},
} satisfies Story;

export const DeeplyRead = {
	args: {
		heading: 'Deeply read',
		trails: trails.slice(10, 20),
	},
} satisfies Story;
