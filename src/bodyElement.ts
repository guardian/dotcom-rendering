// ----- Imports ----- //

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { QuestionType } from '@guardian/atoms-rendering/dist/QuizAtom';
import type { TimelineEvent } from '@guardian/atoms-rendering/dist/types';
import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { Option } from '@guardian/types/option';
import { fromNullable, map, withDefault } from '@guardian/types/option';
import type { Result } from '@guardian/types/result';
import { err, ok, map as rmap } from '@guardian/types/result';
import { parseAtom } from 'atoms';
import { formatDate } from 'date';
import type { Image as ImageData } from 'image';
import { parseImage } from 'image';
import { pipe, pipe2 } from 'lib';
import type { Context, DocParser } from 'types/parserContext';

// ----- Types ----- //

const enum ElementKind {
	Text,
	Image,
	Pullquote,
	Interactive,
	RichLink,
	Tweet,
	Instagram,
	Audio,
	Embed,
	Callout,
	LiveEvent,
	Video,
	InteractiveAtom,
	ExplainerAtom,
	MediaAtom,
	GuideAtom,
	QandaAtom,
	ProfileAtom,
	TimelineAtom,
	ChartAtom,
	AudioAtom,
	QuizAtom,
}

type Image = ImageData & {
	kind: ElementKind.Image;
};

type Audio = {
	kind: ElementKind.Audio;
	src: string;
	height: string;
	width: string;
};

type Video = {
	kind: ElementKind.Video;
	src: string;
	height: string;
	width: string;
};

type MediaKind = ElementKind.Audio | ElementKind.Video;

interface InteractiveAtom {
	kind: ElementKind.InteractiveAtom;
	js: Option<string>;
	css: string;
	html: string;
}

interface ChartAtom {
	kind: ElementKind.ChartAtom;
	title: string;
	id: string;
	html: string;
	css: string[];
	js: string[];
}

interface ExplainerAtom {
	kind: ElementKind.ExplainerAtom;
	html: string;
	title: string;
	id: string;
}

interface MediaAtom {
	kind: ElementKind.MediaAtom;
	posterUrl: string;
	videoId: string;
	duration: Option<number>;
	caption: Option<DocumentFragment>;
}

interface ExpandableAtom {
	html: string;
	title: string;
	id: string;
	image?: string;
	credit?: string;
}

interface GuideAtom extends ExpandableAtom {
	kind: ElementKind.GuideAtom;
}

interface QandaAtom extends ExpandableAtom {
	kind: ElementKind.QandaAtom;
}

interface ProfileAtom extends ExpandableAtom {
	kind: ElementKind.ProfileAtom;
}

interface TimelineAtom {
	kind: ElementKind.TimelineAtom;
	title: string;
	id: string;
	description?: string;
	events: TimelineEvent[];
}

interface AudioAtom {
	kind: ElementKind.AudioAtom;
	id: string;
	trackUrl: string;
	kicker: string;
	title: string;
}

interface QuizAtom {
	kind: ElementKind.QuizAtom;
	id: string;
	questions: QuestionType[];
}

type BodyElement =
	| {
			kind: ElementKind.Text;
			doc: DocumentFragment;
	  }
	| Image
	| {
			kind: ElementKind.Pullquote;
			quote: string;
			attribution: Option<string>;
	  }
	| {
			kind: ElementKind.Interactive;
			url: string;
			alt?: string;
	  }
	| {
			kind: ElementKind.RichLink;
			url: string;
			linkText: string;
	  }
	| {
			kind: ElementKind.Tweet;
			content: NodeList;
	  }
	| {
			kind: ElementKind.Instagram;
			html: string;
	  }
	| Audio
	| {
			kind: ElementKind.Embed;
			html: string;
			alt: Option<string>;
	  }
	| {
			kind: ElementKind.Callout;
			id: string;
			campaign: Campaign;
			description: DocumentFragment;
	  }
	| {
			kind: ElementKind.LiveEvent;
			linkText: string;
			url: string;
			image?: string;
			price?: string;
			start?: string;
	  }
	| Video
	| InteractiveAtom
	| ExplainerAtom
	| MediaAtom
	| GuideAtom
	| QandaAtom
	| ProfileAtom
	| TimelineAtom
	| ChartAtom
	| AudioAtom
	| QuizAtom;

type Elements = BlockElement[] | undefined;

type Body = Array<Result<string, BodyElement>>;

// ----- Functions ----- //

const tweetContent = (
	tweetId: string,
	doc: DocumentFragment,
): Result<string, NodeList> => {
	const blockquote = doc.querySelector('blockquote');

	if (blockquote !== null) {
		return ok(blockquote.childNodes);
	}

	return err(
		`There was no blockquote element in the tweet with id: ${tweetId}`,
	);
};

const parseIframe = (docParser: DocParser) => (
	html: string,
	kind: MediaKind,
): Result<string, Audio | Video> => {
	const iframe = docParser(html).querySelector('iframe');
	const src = iframe?.getAttribute('src');

	if (!iframe || !src) {
		return err('No iframe within html');
	}

	return ok({
		kind,
		src,
		width: iframe.getAttribute('width') ?? '380',
		height: iframe.getAttribute('height') ?? '300',
	});
};

const parse = (context: Context, atoms?: Atoms, campaigns?: Campaign[]) => (
	element: BlockElement,
): Result<string, BodyElement> => {
	switch (element.type) {
		case ElementType.TEXT: {
			const html = element.textTypeData?.html;

			if (!html) {
				return err('No html field on textTypeData');
			}

			return ok({ kind: ElementKind.Text, doc: context.docParser(html) });
		}

		case ElementType.IMAGE:
			return pipe2(
				parseImage(context)(element),
				map<ImageData, Result<string, Image>>((image) =>
					ok({
						kind: ElementKind.Image,
						...image,
					}),
				),
				withDefault<Result<string, Image>>(
					err("I couldn't find a master asset"),
				),
			);

		case ElementType.PULLQUOTE: {
			const { html: quote, attribution } =
				element.pullquoteTypeData ?? {};

			if (!quote) {
				return err('No quote field on pullquoteTypeData');
			}

			return ok({
				kind: ElementKind.Pullquote,
				quote,
				attribution: fromNullable(attribution),
			});
		}

		case ElementType.INTERACTIVE: {
			const { iframeUrl, alt } = element.interactiveTypeData ?? {};

			if (!iframeUrl) {
				return err('No iframeUrl field on interactiveTypeData');
			}

			return ok({ kind: ElementKind.Interactive, url: iframeUrl, alt });
		}

		case ElementType.RICH_LINK: {
			const { url, linkText } = element.richLinkTypeData ?? {};

			if (!url) {
				return err('No "url" field on richLinkTypeData');
			} else if (!linkText) {
				return err('No "linkText" field on richLinkTypeData');
			}

			return ok({ kind: ElementKind.RichLink, url, linkText });
		}

		case ElementType.TWEET: {
			const { id, html: h } = element.tweetTypeData ?? {};

			if (!id) {
				return err('No "id" field on tweetTypeData');
			} else if (!h) {
				return err('No "html" field on tweetTypeData');
			}

			return pipe(
				tweetContent(id, context.docParser(h)),
				rmap((content) => ({ kind: ElementKind.Tweet, content })),
			);
		}

		case ElementType.EMBED: {
			const { html: embedHtml, alt } = element.embedTypeData ?? {};

			if (!embedHtml) {
				return err('No html field on embedTypeData');
			}

			const id = context
				.docParser(embedHtml)
				.querySelector('[data-callout-tagname]')
				?.getAttribute('data-callout-tagname');

			if (id && campaigns) {
				const campaign = campaigns.find(
					(campaign) => campaign.fields.tagName === id,
				);

				if (!campaign) {
					return err('No matching campaign');
				}

				const description = context.docParser(
					campaign.fields.description ?? '',
				);
				return ok({
					kind: ElementKind.Callout,
					id,
					campaign,
					description,
				});
			}

			return ok({
				kind: ElementKind.Embed,
				html: embedHtml,
				alt: fromNullable(alt),
			});
		}

		case ElementType.MEMBERSHIP: {
			const { linkText, originalUrl: url, price, start, image } =
				element.membershipTypeData ?? {};

			if (!linkText || !url) {
				return err(
					'No linkText or originalUrl field on membershipTypeData',
				);
			}

			const formattedDate =
				start?.iso8601 && !isNaN(new Date(start.iso8601).valueOf())
					? formatDate(new Date(start.iso8601))
					: undefined;

			return ok({
				kind: ElementKind.LiveEvent,
				linkText,
				url,
				price,
				start: formattedDate,
				image,
			});
		}

		case ElementType.INSTAGRAM: {
			const { html: instagramHtml } = element.instagramTypeData ?? {};

			if (!instagramHtml) {
				return err('No html field on instagramTypeData');
			}

			return ok({ kind: ElementKind.Instagram, html: instagramHtml });
		}

		case ElementType.AUDIO: {
			const { html: audioHtml } = element.audioTypeData ?? {};

			if (!audioHtml) {
				return err('No html field on audioTypeData');
			}

			return parseIframe(context.docParser)(audioHtml, ElementKind.Audio);
		}

		case ElementType.VIDEO: {
			const { html: videoHtml } = element.videoTypeData ?? {};

			if (!videoHtml) {
				return err('No html field on videoTypeData');
			}

			return parseIframe(context.docParser)(videoHtml, ElementKind.Video);
		}

		case ElementType.CONTENTATOM: {
			if (!atoms) {
				return err('No atom data returned by capi');
			}

			return parseAtom(element, atoms, context.docParser);
		}

		default:
			return err(
				`I'm afraid I don't understand the element I was given: ${element.type}`,
			);
	}
};

const parseElements = (
	context: Context,
	atoms?: Atoms,
	campaigns?: Campaign[],
) => (elements: Elements): Array<Result<string, BodyElement>> => {
	if (!elements) {
		return [err('No body elements available')];
	}
	return elements.map(parse(context, atoms, campaigns));
};

// ----- Exports ----- //

export { ElementKind, BodyElement, Audio, Video, Body, parseElements };
