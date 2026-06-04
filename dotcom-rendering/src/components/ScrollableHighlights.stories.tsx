import { breakpoints } from '@guardian/source/foundations';
import { mocked } from 'storybook/test';
import preview from '../../.storybook/preview';
import {
	defaultCard,
	newsletterCard,
	trails,
} from '../../fixtures/manual/highlights-trails';
import { useAB } from '../lib/useAB';
import { ScrollableHighlights } from './ScrollableHighlights.island';
import { Section } from './Section';

const AB_TEST_NAME = 'newsletters-highlights-signup-card';

const mockNewsletterEnabled = () => {
	mocked(useAB).mockReturnValue({
		isUserInTestGroup: (testName: string, group: string) =>
			testName === AB_TEST_NAME && group === 'enable',
		isUserInTest: () => true,
		getParticipations: () =>
			({ [AB_TEST_NAME]: 'enable' }) as Record<string, string>,
		trackABTests: () => ({}),
	});
};

const meta = preview.meta({
	title: 'Front Containers/ScrollableHighlights',
	component: ScrollableHighlights,
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.mobileLandscape,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	render: ({ ...args }) => (
		<Section
			shouldCenter={true}
			showSideBorders={false}
			fullWidth={true}
			showTopBorder={false}
			padSides={false}
			element="section"
		>
			<ScrollableHighlights {...args} />
		</Section>
	),
});

export const Default = meta.story({
	args: {
		trails: trails.slice(0, 6),
	},
});

export const withEightCards = meta.story({
	name: 'With Eight Cards',
	args: {
		trails: trails.slice(0, 8),
	},
});

export const withTwoLineKicker = meta.story({
	...Default.input,
	name: 'With Two Line Kicker',
	args: {
		trails: [
			{
				...defaultCard,
				kickerText: 'UK Housing and Mortgages',
			},
			...Default.input.args.trails,
		],
	},
});

export const withLiveKicker = meta.story({
	...Default.input,
	name: 'With Live Kicker',
	args: {
		trails: [
			{
				...defaultCard,
				kickerText: 'Live',
				format: { display: 0, theme: 3, design: 11 },
			},
			...Default.input.args.trails,
		],
	},
});

export const withFourLineHeadline = meta.story({
	...Default.input,
	name: 'With Four Line Headline',
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when it is long',
			},
			...Default.input.args.trails,
		],
	},
});

export const withExcessivleyLongHeadline = meta.story({
	...Default.input,
	name: 'With Excessively Long Headline',
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when there is a really long headline that we will never ever have but we should check how it looks anyway',
			},
			...Default.input.args.trails,
		],
	},
});

export const withNewsletterCardVariant = meta.story({
	...Default.input,
	name: 'With Newsletter Signup Card (AB enabled)',
	beforeEach() {
		mockNewsletterEnabled();
	},
	args: {
		trails: [newsletterCard, ...Default.input.args.trails],
	},
});
