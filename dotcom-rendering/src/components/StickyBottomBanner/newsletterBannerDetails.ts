import type { Image as SupportImage } from '@guardian/support-dotcom-components/dist/shared/types';
import type { Newsletter } from '../../types/content';

export const prototypeNewsletterImage = {
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
} satisfies SupportImage;

export const DEFAULT_PROMOTED_NEWSLETTER: Newsletter = {
	listId: 6042,
	identityName: 'the-stakes-us-election-edition',
	name: 'Newsletter name placeholder',
	description: 'Newsletter description placeholder',
	frequency: 'Newsletter frequency placeholder',
	successDescription: 'Newsletter success description placeholder',
	theme: 'news',
	group: 'Newsletter group placeholder',
	category: 'fronts-based',
	regionFocus: 'Newsletter region focus placeholder',
	illustrationCard: prototypeNewsletterImage.mobileUrl,
	illustrationSquare: prototypeNewsletterImage.mainUrl,
	exampleUrl: 'Newsletter example URL placeholder',
};
