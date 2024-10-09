import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';

const meta = {
	component: ExpandableMarketingCard,
	title: 'Components/ExpandableMarketingCard',
} satisfies Meta<typeof ExpandableMarketingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		guardianBaseURL: 'https://www.theguardian.com',
		heading: 'Sample Heading',
		kicker: 'Sample Kicker',
		isExpanded: false,
		setIsExpanded: fn(),
		setIsClosed: fn(),
	},
	decorators: [leftColumnDecorator],
} satisfies Story;

export const Expanded = {
	...Default,
	args: {
		...Default.args,
		isExpanded: true,
	},
} satisfies Story;
