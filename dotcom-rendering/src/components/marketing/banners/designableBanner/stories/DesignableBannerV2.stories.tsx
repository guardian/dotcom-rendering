import type {
	BannerDesignImage,
	SelectedAmountsVariant,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCardsSettings } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import { DesignableBannerUnvalidatedV2 as DesignableBannerV2 } from '../../../banners/designableBanner/DesignableBannerV2';
import {
	design,
	props,
	stringToHexColour,
	tracking,
} from '../../utils/storybook';

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof DesignableBannerV2>>;
const meta: Meta<Props> = {
	component: DesignableBannerV2,
	title: 'Components/marketing/DesignableBannerV2',
	args: {
		...props,
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div>
				<DesignableBannerV2 {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;

const regularChoiceCardAmounts: SelectedAmountsVariant = {
	testName: 'Storybook_test',
	variantName: 'CONTROL',
	defaultContributionType: 'MONTHLY',
	displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
	amountsCardData: {
		// Card should show £5 (default), £10 and "other" buttons
		ONE_OFF: {
			amounts: [5, 10, 15, 20],
			defaultAmount: 5,
			hideChooseYourAmount: false,
		},
		// Card should initially display showing Monthly amounts
		// Card should show £3, £6 and £10 (default) buttons
		MONTHLY: {
			amounts: [3, 6, 10],
			defaultAmount: 10,
			hideChooseYourAmount: true,
		},
		// Card should only show £100 (default) with no "other" button
		ANNUAL: {
			amounts: [100],
			defaultAmount: 100,
			hideChooseYourAmount: true,
		},
	},
};

export const choiceCardsSettings: ChoiceCardsSettings = {
	choiceCards: [
		{
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			label: 'Support £5/month',
			isDefault: false,
			benefits: [
				{
					copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
				},
			],
		},
		{
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Monthly',
			},
			label: 'Support £12/month',
			isDefault: true,
			benefits: [
				{ copy: 'Unlimited access to the Guardian app and Feast app' },
				{ copy: 'Ad-free reading on all your devices' },
			],
			pill: {
				copy: 'Recommended',
			},
		},
		{
			product: {
				supportTier: 'OneOff',
			},
			label: `Support with another amount`,
			isDefault: false,
			benefits: [
				{
					copy: 'We welcome support of any size, any time',
				},
			],
		},
	],
};

const headerImage: BannerDesignImage = {
	kind: 'Image',
	mobileUrl:
		'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
	tabletUrl:
		'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
	desktopUrl:
		'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
	altText: "Guardian: Our Planet can't Speak for itself",
};

export const WithThreeTierChoiceCards: Story = {
	name: 'DesignableBanner with three tier choice cards',
	args: {
		...meta.args,
		design: {
			...design,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('E5E5E5'),
			},
		},
		tracking: {
			...tracking,
			abTestVariant: 'THREE_TIER_CHOICE_CARDS',
		},
		choiceCardAmounts: regularChoiceCardAmounts,
		choiceCardsSettings,
	},
};

export const ThreeTierChoiceCardsWithHeaderImageAndCopy: Story = {
	name: 'Three tier choice cards with header image and header copy',
	args: {
		...meta.args,
		design: {
			...design,
			headerImage,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('E5E5E5'),
			},
		},

		tracking: {
			...tracking,
			abTestVariant: 'THREE_TIER_CHOICE_CARDS',
		},
		choiceCardAmounts: regularChoiceCardAmounts,
		choiceCardsSettings,
	},
};
