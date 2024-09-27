import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { getSublinks, trails } from '../../fixtures/manual/trails';
import type { DCRFrontCard, DCRGroupedTrails } from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FrontSection } from './FrontSection';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
};

const [splash, ...standards] = trails;

const splashCard = {
	...splash,
	trailText: 'Trail text for splash card',
	kickerText: 'Kicker for splash card',
};

/** This creates a list of 8 standard cards which contain:
 * - a card with sublinks
 * - a media card
 * - a boosted card
 * - a mega boosted card
 */
const standardTrails = standards.map((card, index) => {
	/** Helper function to override props for a card */
	const enhanceCardFields = (fields: Partial<DCRFrontCard>): DCRFrontCard =>
		({
			...card,
			trailText: `Trail text for card ${index + 1}`,
			kickerText: `Kicker for card ${index + 1}`,
			...fields,
		}) satisfies DCRFrontCard;

	switch (index + 1) {
		// The second card has two sublinks
		case 2:
			return enhanceCardFields({ supportingContent: getSublinks(2) });
		// The third card is boosted and has one sublink
		case 3:
			return enhanceCardFields({
				boostLevel: 'boost',
				supportingContent: getSublinks(1),
			});
		// The fifth card is megaboosted and has two sublinks
		case 5:
			return enhanceCardFields({
				boostLevel: 'megaboost',
				supportingContent: getSublinks(2),
			});

		default:
			return enhanceCardFields({});
	}
}) satisfies DCRFrontCard[];

type FlexibleGeneralArgsAndCustomArgs = React.ComponentProps<
	typeof FlexibleGeneral
> & { frontSectionTitle: string };

const meta = {
	component: FlexibleGeneral,
	title: 'Components/FlexibleGeneral',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		frontSectionTitle: 'Flexible general',
		groupedTrails: defaultGroupedTrails,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: ({ frontSectionTitle, ...args }) => (
		<FrontSection
			title={frontSectionTitle}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleGeneral {...args} />
		</FrontSection>
	),
} satisfies Meta<FlexibleGeneralArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoSublinkSplash: Story = {
	name: 'Standard splash with no sublinks',
	args: {
		frontSectionTitle: 'Standard splash with no sublinks',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [{ ...splashCard, supportingContent: [] }],
			standard: standardTrails,
		},
	},
};

export const TwoSublinkSplash: Story = {
	name: 'Standard splash with two sublinks',
	args: {
		frontSectionTitle: 'Standard splash with two sublinks',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [{ ...splashCard, supportingContent: getSublinks(2) }],
			standard: standardTrails,
		},
	},
};

const splashWithFourSublinks = {
	...splashCard,
	supportingContent: getSublinks(4),
};
export const FourSublinkSplash: Story = {
	name: 'Standard splash with four sublinks',
	args: {
		frontSectionTitle: 'Standard splash with four sublinks',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [splashWithFourSublinks],
			standard: standardTrails,
		},
	},
};

export const BoostedSplash: Story = {
	name: 'Boosted splash',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [
				{
					...splashWithFourSublinks,
					boostLevel: 'boost',
				},
			],
			standard: trails.slice(1, 9),
		},
	},
};

export const MegaBoostedSplash: Story = {
	name: 'Mega boosted splash',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [
				{
					...splashWithFourSublinks,
					boostLevel: 'megaboost',
				},
			],
			standard: standardTrails,
		},
	},
};

export const GigaBoostedSplash: Story = {
	name: 'Giga boosted splash',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [
				{
					...splashWithFourSublinks,
					boostLevel: 'gigaboost',
				},
			],
			standard: standardTrails,
		},
	},
};
