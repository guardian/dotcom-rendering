import type {
	BannerDesignImage,
	SelectedAmountsVariant,
	TickerSettings,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import {
	choiceCardsSettings,
	choiceCardsWithDestinationUrl,
	choiceCardsWithDestinationUrlTwoCards,
} from '../../../lib/storybook';
import {
	contentNoHeading,
	design,
	mobileContentNoHeading,
	props,
	stringToHexColour,
	tracking,
} from '../../utils/storybook';
import { DesignableBannerUnvalidated as DesignableBanner } from '../DesignableBanner';

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof DesignableBanner>>;
const meta: Meta<Props> = {
	component: DesignableBanner,
	title: 'Components/marketing/DesignableBanner',
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
				<DesignableBanner {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic DesignableBanner',
};

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

const tickerSettings: TickerSettings = {
	currencySymbol: '£',
	copy: {
		countLabel: '',
		goalCopy: 'Goal',
	},
	tickerData: {
		total: 500000,
		goal: 1000000,
	},
	name: 'US',
};

export const WithThreeTierChoiceCards: Story = {
	name: 'With three tier choice cards',
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
	name: 'With three tier choice cards + header image + header copy',
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

export const HeaderImageOnly: Story = {
	name: 'With header image and no header copy',
	args: {
		...meta.args,
		content: contentNoHeading,
		mobileContent: mobileContentNoHeading,
		design: {
			...design,
			headerImage,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('E5E5E5'),
			},
			colours: {
				...design.colours,
				basic: {
					...design.colours.basic,
					background: stringToHexColour('FFFFFF'),
				},
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

export const MainImage: Story = {
	name: 'With main image',
	args: {
		...meta.args,
		design: {
			...design,
			visual: regularImage,
		},
		tracking: {
			...tracking,
			abTestVariant: 'MAIN_IMAGE',
		},
	},
};

export const DesignThreeAnimatedHeaderImage: Story = {
	name: 'With animated header image',
	args: {
		...meta.args,
		content: contentNoHeading,
		mobileContent: mobileContentNoHeading,
		design: {
			...design,
			headerImage: {
				mobileUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				tabletUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				desktopUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				altText: 'Guardian: News provider of the year',
			},
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('E5E5E5'),
			},
			colours: {
				...design.colours,
				basic: {
					...design.colours.basic,
					background: stringToHexColour('FFFFFF'),
				},
			},
		},
		choiceCardAmounts: regularChoiceCardAmounts,
		choiceCardsSettings,
	},
};

export const WithTickerAndThreeTierChoiceCards: Story = {
	name: 'With ticker + three tier choice cards',
	args: {
		...meta.args,
		tickerSettings,
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

export const WithThreeTierChoiceCardsAndArticleCount: Story = {
	name: 'With article count + three tier choice cards',
	args: {
		...meta.args,
		separateArticleCountSettings: {
			type: 'above',
		},
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

export const NoChoiceCardOrImage: Story = {
	name: 'With no choice cards or image',
	args: {
		...meta.args,
		design: {
			...design,
			visual: undefined,
		},
	},
};

export const WithDestinationUrlAllCards: Story = {
	name: 'With destinationUrl on all choice cards',
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
		choiceCardsSettings: choiceCardsWithDestinationUrl,
	},
	parameters: {
		docs: {
			description: {
				story: 'All choice cards have a destinationUrl configured. The banner should use these custom URLs instead of constructing URLs with product parameters.',
			},
		},
	},
};

export const WithDestinationUrlTwoCards: Story = {
	name: 'With destinationUrl in two choice cards',
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
		choiceCardsSettings: choiceCardsWithDestinationUrlTwoCards,
	},
	parameters: {
		docs: {
			description: {
				story: 'All choice cards have a destinationUrl configured. The banner should use these custom URLs instead of constructing URLs with product parameters.',
			},
		},
	},
};

export const CollapsableWithThreeTierChoiceCards: Story = {
	name: 'Collapsable with three tier choice cards',
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
			abTestVariant: 'COLLAPSABLE_V1',
		},
		choiceCardAmounts: regularChoiceCardAmounts,
		choiceCardsSettings,
		tickerSettings,
	},
};

export const CollapsableWithMainImage: Story = {
	name: 'Collapsable with main image',
	args: {
		...meta.args,
		design: {
			...design,
			visual: regularImage,
		},
		tracking: {
			...tracking,
			abTestVariant: 'COLLAPSABLE_V1',
		},
	},
};
