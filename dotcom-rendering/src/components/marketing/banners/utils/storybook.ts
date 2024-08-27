/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/utils/storybook.ts
 */
import {
	SecondaryCtaType,
	TickerCountType,
	TickerEndType,
} from '@guardian/support-dotcom-components';
import type {
	BannerProps,
	TickerSettings,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import type {
	ConfigurableDesign,
	HexColour,
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

export const content = {
	heading: 'Show your support for high&#8209;impact reporting.',
	messageText:
		'In the extraordinary year that was 2021, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
	paragraphs: [
		'In the extraordinary year that was 2022, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth.',
		'You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
	],
	mobileMessageText:
		'With 2021 offering new hope, %%ARTICLE_COUNT%% articles we commit to another year of independent journalism.',
	highlightedText: 'Support us from as little as %%CURRENCY_SYMBOL%%1.',
	cta: {
		baseUrl: 'https://support.theguardian.com/contribute',
		text: 'Support The Guardian',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			baseUrl: 'https://support.theguardian.com/contribute',
			text: 'Learn more',
		},
	},
};

export const tickerSettings: TickerSettings = {
	countType: TickerCountType.money,
	endType: TickerEndType.hardstop,
	currencySymbol: '$',
	copy: {
		countLabel: 'contributed',
		goalReachedPrimary: "It's not too late to give!",
		goalReachedSecondary: '',
	},
	tickerData: {
		total: 120_000,
		goal: 150_000,
	},
	name: 'US',
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
		},
	},
};

export const props: BannerProps = {
	bannerChannel: 'contributions',
	isSupporter: false,
	countryCode: 'GB',
	tracking,
	content,
	tickerSettings,
	separateArticleCountSettings: {
		copy: 'You’ve read %%ARTICLE_COUNT%% articles in the last few weeks.',
		type: 'above',
	},
	articleCounts: {
		for52Weeks: 12,
		forTargetedWeeks: 12,
	},
	design,
};
