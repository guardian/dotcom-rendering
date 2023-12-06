// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { ArticleElementRole } from '@guardian/libs';
import { none, OptionKind, some } from '../../vendor/@guardian/types/index';
import type { Option } from '../../vendor/@guardian/types/index';
import type { Body } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { parse } from 'client/parser';
import { EmbedKind } from 'embed';
import { ImageSubtype } from 'image/image';
import type { NewsletterSignup } from 'item';
import { MainMediaKind } from 'mainMedia';
import type { MainMedia } from 'mainMedia';
import { Optional } from 'optional';

const parser = new DOMParser();
const parseHtml = (html: string): Optional<DocumentFragment> =>
	parse(parser)(html).toOptional();

const captionDocFragment = parseHtml(
	'Fashion Statement Email image',
).toOption();

const newsletterMainMedia: Option<MainMedia> = {
	kind: OptionKind.Some,
	value: {
		kind: MainMediaKind.Image,
		image: {
			src: 'https://i.guim.co.uk/img/media/3d3dedb9f24f7f3a69297a02b626ca284524eb42/1925_1_1396_838/master/1396.jpg?width=500&quality=85&fit=bounds&s=5b91a5fdc71ae43f0cf776c6ee652820',
			srcset: 'https://i.guim.co.uk/img/media/3d3dedb9f24f7f3a69297a02b626ca284524eb42/1925_1_1396_838/master/1396.jpg?width=500&quality=85&fit=bounds&s=5b91a5fdc71ae43f0cf776c6ee652820',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/3d3dedb9f24f7f3a69297a02b626ca284524eb42/1925_1_1396_838/master/1396.jpg?width=500&quality=85&fit=bounds&s=5b91a5fdc71ae43f0cf776c6ee652820',
			alt: some('image'),
			width: 3000,
			height: 1800,
			caption: captionDocFragment,
			credit: {
				kind: OptionKind.None,
			},
			nativeCaption: {
				kind: OptionKind.None,
			},
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		},
	},
};

const docFixture = (content: string): Node => {
	const doc = new DocumentFragment();
	const el = document.createElement('p');
	el.innerHTML = content;
	doc.appendChild(el);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this value is not `null`
	return doc.firstChild!;
};

const newsletterHeadline =
	'Sign up for the Fashion Statement newsletter: our free fashion email';
const newsletterStandfirst = parseHtml(
	`<p>Style with substance: smart fashion writing and inspiring shopping galleries from the Guardian</p>`,
);
const newsletterBody: Body = [
	{
		kind: ElementKind.Text,
		doc: docFixture(
			'A weekly hit of style with substance. Smart fashion writing and inspiring shopping galleries delivered straight to your inbox. Sign up for our Friday email for the best of the week in style, brought to you with expertise, humour and irreverence.',
		),
	},
	{
		kind: ElementKind.Embed,
		embed: {
			kind: EmbedKind.EmailSignup,
			alt: none,
			caption: none,
			src: 'https://www.theguardian.com/email/form/plain/fashion-statement',
			tracking: EmbedTracksType.DOES_NOT_TRACK,
			source: none,
			sourceDomain: none,
		},
	},
	{
		kind: ElementKind.Text,
		doc: docFixture(
			'<strong><a href="https://www.theguardian.com/email-newsletters">Explore all our newsletters:</a></strong><a href="https://www.theguardian.com/email-newsletters"> whether you love film, football, fashion or food, we’ve got something for you</a>',
		),
	},
];

export const partialNewsletterItem: Partial<NewsletterSignup> = {
	headline: newsletterHeadline,
	standfirst: newsletterStandfirst,
	mainMedia: newsletterMainMedia,
	body: newsletterBody,
	promotedNewsletter: some({
		kind: ElementKind.NewsletterSignUp,
		identityName: 'fashion-statement',
		description:
			'Style with substance: smart fashion writing and inspiring shopping galleries - expect both expertise and irreverence',
		name: 'Fashion Statement',
		frequency: 'Weekly',
		theme: 'lifestyle',
		successDescription: "We'll send you Fashion Statement every week",
		regionFocus: 'UK',
		paused: false,
	}),
	branding: none,
};
