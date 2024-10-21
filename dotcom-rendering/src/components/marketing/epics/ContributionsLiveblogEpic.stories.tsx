/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsLiveblogEpic.stories.tsx
 */
import {
	SecondaryCtaType,
	TickerCountType,
	TickerEndType,
} from '@guardian/support-dotcom-components';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import React from 'react';
import { ContributionsLiveblogEpic } from './ContributionsLiveblogEpic';
import { props } from './utils/storybook';

const { variant, articleCounts, tracking } = props;

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<
	React.ComponentProps<typeof ContributionsLiveblogEpic>
>;
const meta: Meta<Props> = {
	component: ContributionsLiveblogEpic,
	title: 'Components/marketing/ContributionsLiveblogEpic',
	args: {
		variant,
		articleCounts,
		tracking,
		countryCode: 'GB',
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return <ContributionsLiveblogEpic {...args} {...jsonProps} />;
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic ContributionsLiveblogEpic',
};

export const WithoutSupportUrl: Story = {
	name: 'ContributionsLiveblogEpic without Support URL',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			cta: {
				baseUrl: 'https://theguardian.com',
				text: 'The Guardian',
			},
			secondaryCta: undefined,
		},
	},
};

export const WithReminderCta: Story = {
	name: 'ContributionsLiveblogEpic with Reminder CTA',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			secondaryCta: {
				type: SecondaryCtaType.ContributionsReminder,
			},
			showReminderFields: {
				reminderCta: 'Remind me in December',
				reminderPeriod: '2022-12-01',
				reminderLabel: 'December',
			},
		},
	},
};

export const WithThreeTierChoiceCards: Story = {
	name: 'ContributionsLiveblogEpic with Three Tier Choice Cards',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			name: 'THREE_TIER_CHOICE_CARDS',
			secondaryCta: undefined,
			showChoiceCards: true,
		},
	},
};

export const WithThreeTierChoiceCardsForUS: Story = {
	name: 'Contributions Liveblog Epic with Three Tier Choice Cards for US',
	args: {
		...meta.args,
		countryCode: 'US',
		variant: {
			...props.variant,
			name: 'US_CHECKOUT_PAGE',
			secondaryCta: undefined,
			showChoiceCards: true,
		},
	},
};
export const WithThreeTierChoiceCardsForUSWithColourVariant: Story = {
	name: 'Contributions Liveblog Epic with Three Tier Choice Cards for US and with Colour Variant',
	args: {
		...meta.args,
		tracking: {
			...tracking,
			abTestName: 'US_LB_EPIC_BG_COLOUR',
			abTestVariant: 'VARIANT',
		},
		countryCode: 'US',
		variant: {
			...props.variant,
			name: 'VARIANT',
			heading: 'There’s no paywall here',
			paragraphs: [
				'Apologies for the brief interruption. We hope you’re appreciating these factual, verified, up-to-the-minute news updates provided by our expert reporters.',
				'You will never find a paywall around our live blogs – or any of our news, because the Guardian believes that access to trustworthy information is vital for democracy.',
				'In a time of increasing misinformation spread by bad actors, extremist media and autocratic politicians, real, reliable journalism has never been more important – and we’re proud to be able to make ours free thanks to the generous support of readers like you.',
				'By helping fund the Guardian today, you can play a vital role in combating the bad faith and self-interest of a powerful few who spread lies to undermine our democracy, enrich themselves, and stoke division between Americans.',
				'Before you get back to reading the news, we would be grateful if you could take half a minute to give us your support. Any amount helps. Thank you.',
			],
			secondaryCta: undefined,
			showChoiceCards: true,
			tickerSettings: {
				endType: TickerEndType.unlimited,
				countType: TickerCountType.money,
				currencySymbol: '£',
				copy: {
					countLabel: '',
					goalReachedPrimary: '',
					goalReachedSecondary: '',
				},
				tickerData: {
					total: 500000,
					goal: 2000000,
				},
				name: 'US',
			},
		},
	},
};

export const WithThreeTierChoiceCardsForUSWithColourControl: Story = {
	name: 'Contributions Liveblog Epic with Three Tier Choice Cards for US and with Colour Control',
	args: {
		...meta.args,
		tracking: {
			...tracking,
			abTestName: 'US_LB_EPIC_BG_COLOUR',
			abTestVariant: 'CONTROL',
		},
		countryCode: 'US',
		variant: {
			...props.variant,
			name: 'CONTROL',
			heading: 'There’s no paywall here',
			paragraphs: [
				'Apologies for the brief interruption. We hope you’re appreciating these factual, verified, up-to-the-minute news updates provided by our expert reporters.',
				'You will never find a paywall around our live blogs – or any of our news, because the Guardian believes that access to trustworthy information is vital for democracy.',
				'In a time of increasing misinformation spread by bad actors, extremist media and autocratic politicians, real, reliable journalism has never been more important – and we’re proud to be able to make ours free thanks to the generous support of readers like you.',
				'By helping fund the Guardian today, you can play a vital role in combating the bad faith and self-interest of a powerful few who spread lies to undermine our democracy, enrich themselves, and stoke division between Americans.',
				'Before you get back to reading the news, we would be grateful if you could take half a minute to give us your support. Any amount helps. Thank you.',
			],
			secondaryCta: undefined,
			showChoiceCards: true,
			tickerSettings: {
				endType: TickerEndType.unlimited,
				countType: TickerCountType.money,
				currencySymbol: '£',
				copy: {
					countLabel: '',
					goalReachedPrimary: '',
					goalReachedSecondary: '',
				},
				tickerData: {
					total: 500000,
					goal: 2000000,
				},
				name: 'US',
			},
		},
	},
};

export const WithTicker: Story = {
	name: 'ContributionsLiveblogEpic with Ticker',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			secondaryCta: undefined,
			showChoiceCards: true,
			tickerSettings: {
				endType: TickerEndType.unlimited,
				countType: TickerCountType.money,
				currencySymbol: '£',
				copy: {
					countLabel: 'Help us reach our end-of-year goal',
					goalReachedPrimary: '',
					goalReachedSecondary: '',
				},
				tickerData: {
					total: 10000,
					goal: 100000,
				},
				name: 'US',
			},
		},
	},
};

export const WithNewsletterSignup: Story = {
	name: 'ContributionsEpic with newsletter signup',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			highlightedText: undefined,
			heading: 'Sign up to First Edition',
			paragraphs: [
				'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
			],
			newsletterSignup: {
				newsletterId: 'morning-briefing',
				successDescription:
					'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
			},
		},
	},
};
