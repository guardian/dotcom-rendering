import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { getSublinks, trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { DynamicPackage } from './DynamicPackage';
import { FrontSection } from './FrontSection';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
};

const meta = {
	component: DynamicPackage,
	title: 'Components/DynamicPackage',
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
		groupedTrails: defaultGroupedTrails,
		containerPalette: 'LongRunningPalette',
		imageLoading: 'eager',
		absoluteServerTimes: true,
		showAge: false,
	},
	render: (args) => (
		<FrontSection
			title={
				args.containerPalette
					? `Dynamic Package (${args.containerPalette})`
					: 'Dynamic Package (without container palette)'
			}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			containerPalette={args.containerPalette}
			showTopBorder={true}
		>
			<DynamicPackage
				groupedTrails={args.groupedTrails}
				absoluteServerTimes={args.absoluteServerTimes}
				imageLoading={args.imageLoading}
				containerPalette={args.containerPalette}
				showAge={args.showAge}
			/>
		</FrontSection>
	),
} satisfies Meta<typeof DynamicPackage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one standard card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 1),
		},
	},
};

export const OneWithManySublinks: Story = {
	name: 'With one standard card and many supporting content items',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{
					...trails[0],
					supportingContent: getSublinks(6),
				},
			],
		},
	},
};

export const Two: Story = {
	name: 'With two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 2),
		},
	},
};

export const Three: Story = {
	name: 'With three standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 3),
		},
	},
};

export const Four: Story = {
	name: 'With four standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 4),
		},
	},
};

export const Five: Story = {
	name: 'With five standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 5),
		},
	},
};

export const Six: Story = {
	name: 'With six standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 6),
		},
	},
};

export const Seven: Story = {
	name: 'With seven standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 7),
		},
	},
};

export const Eight: Story = {
	name: 'With eight standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 8),
		},
	},
};

export const Nine: Story = {
	name: 'With nine standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 9),
		},
	},
};

export const Boosted: Story = {
	name: 'With one standard card - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...trails[0], isBoosted: true }],
		},
		showAge: true,
	},
};

export const Boosted2: Story = {
	name: 'With two standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 2),
			],
		},
		showAge: true,
	},
};

export const Boosted3: Story = {
	name: 'With three standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 3),
			],
		},
		showAge: true,
	},
};

export const Boosted4: Story = {
	name: 'With four standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 4),
			],
		},
		showAge: true,
	},
};

export const Boosted5: Story = {
	name: 'With five standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 5),
			],
		},
		showAge: true,
	},
};

export const Boosted8: Story = {
	name: 'With eight standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 8),
			],
		},
		showAge: true,
	},
};
export const Boosted9: Story = {
	name: 'With nine standard cards - boosted',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], isBoosted: true },
				...trails.slice(1, 9),
			],
		},
		showAge: true,
	},
};

export const OneSnapThreeStandard: Story = {
	name: 'With one snap - three standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [trails[0]],
			standard: trails.slice(1, 4),
		},
	},
};

export const ThreeSnapTwoStandard: Story = {
	name: 'With three snaps - two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: trails.slice(0, 3),
			standard: trails.slice(3, 5),
		},
	},
};

export const ThreeSnapTwoStandard2ndBoosted: Story = {
	name: 'With three snaps (2nd boosted) - two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [trails[0], { ...trails[1], isBoosted: true }, trails[2]],
			standard: trails.slice(3, 5),
		},
	},
};

export const SpecialReportWithoutPalette: Story = {
	name: 'With one standard card',
	args: {
		containerPalette: undefined,
		groupedTrails: {
			...defaultGroupedTrails,
			snap: trails.slice(0, 1),
			standard: [
				{
					format: {
						display: ArticleDisplay.Immersive,
						theme: ArticleSpecial.SpecialReport,
						design: ArticleDesign.Standard,
					},
					url: '/news/2016/apr/08/mossack-fonseca-law-firm-hide-money-panama-papers',
					kickerText: 'Mossack Fonseca',
					headline:
						'inside the firm that helps the super-rich hide their money',
					showQuotedHeadline: false,
					dataLinkName: 'news | group-0 | card-@1',
					mainMedia: undefined,
					showLivePlayable: false,
					isExternalLink: false,
					webPublicationDate: '2016-04-08T12:15:09.000Z',
					image: {
						src: 'https://media.guim.co.uk/bc9acaefba82b18506aa4e60801d0a6af7176a44/0_106_3000_1800/3000.jpg',
						altText: 'An office building',
					},
					isBoosted: false,
					trailText:
						'As Panama Papers shine light on offshore world, Luke Harding takes a closer look at company exploiting tropical tax havens',
					supportingContent: [],
					byline: 'Luke Harding',
					snapData: {},
					isCrossword: false,
					discussionApiUrl,
				},
			],
		},
	},
};

export const VideoSublinks: Story = {
	name: 'With one video card, and supporting content',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(-1),
		},
	},
};
