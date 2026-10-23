import type {
	BannerProps,
	Image as SupportImage,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { Newsletter } from '../../types/content';

export type PromotedNewsletter = Pick<
	Newsletter,
	'listId' | 'identityName' | 'name' | 'frequency'
>;

export const DEFAULT_PROMOTED_NEWSLETTER: PromotedNewsletter = {
	listId: 6042,
	identityName: 'the-stakes-us-election-edition',
	name: 'The Stakes 2026',
	frequency: 'Weekly',
};

export const NEWSLETTER_BANNER_CONFIG = {
	bannerChannel: 'contributions',
	content: {
		heading: 'Sign up to The Stakes 2026',
		paragraphs: [
			'From the races and candidates to watch to the issues shaping American politics, The Stakes 2026 brings you expert analysis of what really matters in the US midterms.',
		],
	},
	isCollapsible: false,
	imageSettings: {
		mainUrl:
			'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
		mobileUrl:
			'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
		tabletUrl:
			'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
		desktopUrl:
			'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
		wideUrl:
			'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
		altText: '',
	},
	design: {
		colours: {
			basic: {
				background: { r: 'F3', g: 'F7', b: 'FF', kind: 'hex' },
				bodyText: { r: '33', g: '33', b: '33', kind: 'hex' },
				headerText: { r: '12', g: '12', b: '12', kind: 'hex' },
				articleCountText: { r: '00', g: '00', b: '00', kind: 'hex' },
				logo: { r: '00', g: '00', b: '00', kind: 'hex' },
			},
			highlightedText: {
				text: { r: '33', g: '33', b: '33', kind: 'hex' },
				highlight: { r: 'F3', g: 'F7', b: 'FF', kind: 'hex' },
			},
			primaryCta: {
				default: {
					text: { r: '05', g: '29', b: '62', kind: 'hex' },
					background: { r: 'FF', g: 'E5', b: '00', kind: 'hex' },
				},
			},
			secondaryCta: {
				default: {
					text: { r: '00', g: '00', b: '00', kind: 'hex' },
					background: { r: 'F1', g: 'F8', b: 'FC', kind: 'hex' },
					border: { r: '00', g: '00', b: '00', kind: 'hex' },
				},
			},
			closeButton: {
				default: {
					text: { r: '00', g: '00', b: '00', kind: 'hex' },
					background: { r: 'E6', g: 'EC', b: 'EF', kind: 'hex' },
					border: { r: 'E6', g: 'EC', b: 'EF', kind: 'hex' },
				},
			},
			ticker: {
				filledProgress: { r: '33', g: '33', b: '33', kind: 'hex' },
				progressBarBackground: {
					r: 'F3',
					g: 'F7',
					b: 'FF',
					kind: 'hex',
				},
				headlineColour: { r: '33', g: '33', b: '33', kind: 'hex' },
				totalColour: { r: '33', g: '33', b: '33', kind: 'hex' },
				goalColour: { r: '33', g: '33', b: '33', kind: 'hex' },
			},
		},
	},
	promotedNewsletter: DEFAULT_PROMOTED_NEWSLETTER,
} satisfies Omit<BannerProps, 'tracking' | 'articleCounts'> & {
	imageSettings: SupportImage;
	promotedNewsletter: PromotedNewsletter;
};
