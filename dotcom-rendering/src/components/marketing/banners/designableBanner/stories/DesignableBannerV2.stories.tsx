import type {
	BannerDesignImage,
	SelectedAmountsVariant,
} from '@guardian/support-dotcom-components/dist/shared/types';
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

const edgeCaseChoiceCardAmounts: SelectedAmountsVariant = {
	testName: 'Storybook_test',
	variantName: 'CONTROL',
	defaultContributionType: 'ANNUAL',
	displayContributionType: ['ONE_OFF', 'ANNUAL'],
	amountsCardData: {
		// Card should show only the "other" button (overrides hidden requirement)
		ONE_OFF: {
			amounts: [],
			defaultAmount: 1,
			hideChooseYourAmount: true,
		},
		// Card should not include a monthly tab or monthly amounts
		MONTHLY: {
			amounts: [3, 6, 10],
			defaultAmount: 10,
			hideChooseYourAmount: true,
		},
		// Card should initially display showing Annual amounts
		// Card should show £100 (default), £200 and £300 buttons
		ANNUAL: {
			amounts: [100, 200, 300],
			defaultAmount: 100,
			hideChooseYourAmount: true,
		},
	},
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

const regularImage: BannerDesignImage = {
	kind: 'Image',
	mobileUrl:
		'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
	tabletUrl:
		'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
	desktopUrl:
		'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
	altText: 'Example alt text',
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
	},
};

export const ThreeTierChoiceCardsWithImage: Story = {
	name: 'Three tier choice cards layout with image ',
	args: {
		...meta.args,
		design: {
			...design,
			visual: regularImage,
		},
		tracking: {
			...tracking,
			abTestVariant: 'THREE_TIER_CHOICE_CARDS',
		},
		choiceCardAmounts: regularChoiceCardAmounts,
	},
};
