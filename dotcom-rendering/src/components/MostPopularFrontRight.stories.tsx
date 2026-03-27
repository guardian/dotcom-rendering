import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { trails } from '../../fixtures/manual/trails';
import { MostPopularFrontRight } from './MostPopularFrontRight';

const meta = preview.meta({
	component: MostPopularFrontRight,
	title: 'Components/MostPopularFrontRight',
	decorators: [rightColumnDecorator],
	render: (args) => (
		<div css={{ position: 'relative' }}>
			<MostPopularFrontRight {...args} />
		</div>
	),
});

export const MostViewed = meta.story({
	args: {
		heading: 'Most viewed',
		trails: trails.slice(0, 10),
	},
});

export const DeeplyRead = meta.story({
	args: {
		heading: 'Deeply read',
		trails: trails.slice(10, 20),
	},
});
