import { breakpoints } from '@guardian/source/foundations';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
	centreColumnDecorator,
	leftColumnDecorator,
} from '../../.storybook/decorators/gridDecorators';
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
		heading: 'Pop your US news bubble',
		kicker: 'How the Guardian is different',
		isExpanded: false,
		setIsExpanded: fn(),
		setIsClosed: fn(),
	},
	decorators: [centreColumnDecorator],
	parameters: {
		viewport: {
			defaultViewport: 'mobile',
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
			],
		},
	},
} satisfies Story;

// LeftCol and larger screen sizes
export const DefaultLargeScreens = {
	args: {
		guardianBaseURL: 'https://www.theguardian.com',
		heading: 'Pop your US news bubble',
		kicker: 'How the Guardian is different',
		isExpanded: false,
		setIsExpanded: fn(),
		setIsClosed: fn(),
	},
	decorators: [leftColumnDecorator],
	parameters: {
		viewport: {
			defaultViewport: 'leftCol',
		},
		chromatic: {
			viewports: [breakpoints.leftCol, breakpoints.wide],
		},
	},
} satisfies Story;

export const Expanded = {
	...Default,
	args: {
		...Default.args,
		isExpanded: true,
	},
} satisfies Story;

export const ExpandedLargeScreens = {
	...DefaultLargeScreens,
	args: {
		...DefaultLargeScreens.args,
		isExpanded: true,
	},
} satisfies Story;
