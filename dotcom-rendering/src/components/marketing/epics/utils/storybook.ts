import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type {
	EpicVariant,
	PageTracking,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import type { TestTracking } from '@guardian/support-dotcom-components/dist/shared/src/types/abTests/shared';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types/props/epic';

const variant: EpicVariant = {
	name: 'control',
	heading: 'Since you’re here...',
	paragraphs: [
		"... we have a small favour to ask. You've read %%ARTICLE_COUNT%% articles. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.",
		'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
		'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
		'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
	],
	highlightedText:
		'Support The Guardian from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
	cta: {
		text: 'Support The Guardian',
		baseUrl: 'https://support.theguardian.com/contribute',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			text: 'Read our pledge',
			baseUrl:
				'https://www.theguardian.com/environment/ng-interactive/2019/oct/16/the-guardians-climate-pledge-2019?INTCMP=pledge_Jan_2020',
		},
	},
	showChoiceCards: false,
};

const articleCounts = {
	for52Weeks: 99,
	forTargetedWeeks: 99,
};

const pageTracking: PageTracking = {
	ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
	platformId: 'GUARDIAN_WEB',
	clientName: 'dcr',
	referrerUrl:
		'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
};

const testTracking: TestTracking = {
	campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
	campaignId: 'remote_epic_test',
	abTestName: 'remote_epic_test',
	abTestVariant: 'api',
	componentType: 'ACQUISITIONS_EPIC',
	products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};

const tracking: Tracking = {
	...pageTracking,
	...testTracking,
};

const openCmp = (): void => console.log('open cmp');

export const props: EpicProps = { variant, tracking, openCmp, articleCounts };
