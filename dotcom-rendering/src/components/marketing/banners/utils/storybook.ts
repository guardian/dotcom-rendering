/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/utils/storybook.ts
 */
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type {
	BannerProps,
	ConfigurableDesign,
	HexColour,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types';

export const tracking: Tracking = {
	ophanPageId: 'kbluzw2csbf83eabedel',
	componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
	platformId: 'GUARDIAN_WEB',
	clientName: 'dcr',
	referrerUrl: 'http://localhost:3030/Article',
	abTestName: 'UsEoyAppealBannerSupporters',
	abTestVariant: 'control',
	campaignCode: 'UsEoyAppealBanner_control',
};

export const contentNoHeading = {
	paragraphs: [
		'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
		'We do not shy away. And we provide all this for free, for everyone.',
	],
	highlightedText:
		'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
	cta: {
		text: 'Support once',
		baseUrl: 'https://support.theguardian.com/contribute/one-off',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			text: 'Support monthly',
			baseUrl: 'https://support.theguardian.com/contribute/recurring',
		},
	},
};
export const contentWithHeading = {
	...contentNoHeading,
	heading: 'Show your support for reader-funded journalism',
};

export const mobileContentNoHeading = {
	paragraphs: [
		'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
		'We do not shy away. And we provide all this for free, for everyone.',
	],
	highlightedText:
		'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
	cta: {
		text: 'Support us',
		baseUrl: 'https://support.theguardian.com/contribute/one-off',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			text: 'Learn more',
			baseUrl: 'https://support.theguardian.com/contribute/recurring',
		},
	},
};

export const mobileContentWithHeading = {
	...mobileContentNoHeading,
	heading: 'Show your support for reader-funded journalism',
};

const hexColourStringRegex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
export const stringToHexColour = (colourString: string): HexColour => {
	if (hexColourStringRegex.test(colourString)) {
		const matches = hexColourStringRegex.exec(colourString);
		return {
			r: (matches?.[1] as string).toUpperCase(),
			g: (matches?.[2] as string).toUpperCase(),
			b: (matches?.[3] as string).toUpperCase(),
			kind: 'hex',
		} as HexColour;
	} else {
		throw new Error('Invalid hex colour string!');
	}
};

export const design: ConfigurableDesign = {
	colours: {
		basic: {
			background: stringToHexColour('F1F8FC'),
			bodyText: stringToHexColour('000000'),
			headerText: stringToHexColour('000000'),
			articleCountText: stringToHexColour('000000'),
			logo: stringToHexColour('000000'),
		},
		highlightedText: {
			text: stringToHexColour('000000'),
			highlight: stringToHexColour('FFE500'),
		},
		primaryCta: {
			default: {
				text: stringToHexColour('FFFFFF'),
				background: stringToHexColour('0077B6'),
			},
			hover: {
				text: stringToHexColour('FFFFFF'),
				background: stringToHexColour('004E7C'),
			},
		},
		secondaryCta: {
			default: {
				text: stringToHexColour('004E7C'),
				background: stringToHexColour('F1F8FC'),
				border: stringToHexColour('004E7C'),
			},
			hover: {
				text: stringToHexColour('004E7C'),
				background: stringToHexColour('E5E5E5'),
				border: stringToHexColour('004E7C'),
			},
		},
		closeButton: {
			default: {
				text: stringToHexColour('052962'),
				background: stringToHexColour('F1F8FC'),
				border: stringToHexColour('052962'),
			},
			hover: {
				text: stringToHexColour('052962'),
				background: stringToHexColour('E5E5E5'),
			},
		},
		ticker: {
			text: stringToHexColour('052962'),
			filledProgress: stringToHexColour('052962'),
			progressBarBackground: stringToHexColour('cccccc'),
			goalMarker: stringToHexColour('000000'),
			headlineColour: stringToHexColour('052962'),
			totalColour: stringToHexColour('052962'),
			goalColour: stringToHexColour('052962'),
			goalColour: stringToHexColour('000000'),
			headlineColour: stringToHexColour('000000'),
			totalColour: stringToHexColour('000000'),
		},
	},
};

export const props: BannerProps = {
	bannerChannel: 'contributions',
	isSupporter: false,
	countryCode: 'GB',
	tracking,
	content: contentWithHeading,
	mobileContent: mobileContentWithHeading,
	articleCounts: {
		for52Weeks: 12,
		forTargetedWeeks: 12,
	},
	design,
};
