// ----- Imports ----- //

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { TimelineEvent } from '@guardian/atoms-rendering/dist/types/types';
import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { ArticleTheme } from '@guardian/libs';
import type { Option, Result } from '@guardian/types';
import {
	err,
	fromNullable,
	map,
	ok,
	resultMap,
	withDefault,
} from '@guardian/types';
import { parseAtom } from 'atoms';
import { ElementKind } from 'bodyElementKind';
import { formatDate } from 'date';
import { parseAudio, parseGeneric, parseInstagram, parseVideo } from 'embed';
import type { Embed } from 'embed';
import type { Image as ImageData } from 'image';
import { parseImage } from 'image';
import { compose, pipe } from 'lib';
import type { Context } from 'parserContext';
import type { KnowledgeQuizAtom, PersonalityQuizAtom } from 'quizAtom';

// ----- Types ----- //

type Text = {
	kind: ElementKind.Text;
	doc: Node;
};

type HeadingTwo = {
	kind: ElementKind.HeadingTwo;
	doc: Node;
};

type Image = ImageData & {
	kind: ElementKind.Image;
};

type EmbedElement = {
	kind: ElementKind.Embed;
	embed: Embed;
};

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
	id: string;
	title: string;
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

interface NewsletterSignUp {
	kind: ElementKind.NewsletterSignUp;
	id: string;
	displayName: string;
	frequency: string;
	description: string;
	group: string;
	theme: ArticleTheme;
}

type BodyElement =
	| Text
	| HeadingTwo
	| Image
	| {
			kind: ElementKind.Pullquote;
			quote: string;
			attribution: Option<string>;
	  }
	| {
			kind: ElementKind.Interactive;
			url: string;
			alt: Option<string>;
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
	| EmbedElement
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
	| InteractiveAtom
	| ExplainerAtom
	| MediaAtom
	| GuideAtom
	| QandaAtom
	| ProfileAtom
	| TimelineAtom
	| ChartAtom
	| AudioAtom
	| KnowledgeQuizAtom
	| PersonalityQuizAtom
	| NewsletterSignUp;

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

const toEmbedElement: (
	parsed: Result<string, Embed>,
) => Result<string, BodyElement> = resultMap((embed) => ({
	kind: ElementKind.Embed,
	embed,
}));

const flattenTextElement = (doc: Node): BodyElement[] => {
	const childNodes = Array.from(doc.childNodes);
	return childNodes.map((node) => {
		switch (node.nodeName) {
			case 'H2':
				console.log('textContent: ');
				console.log(node.textContent);
				return {
					kind: ElementKind.HeadingTwo,
					doc: node,
				};
			default:
				return {
					kind: ElementKind.Text,
					doc: node,
				};
		}
	});
};

const parse =
	(context: Context, atoms?: Atoms, campaigns?: Campaign[]) =>
	(
		element: BlockElement,
	): Result<string, BodyElement> | Array<Result<string, BodyElement>> => {
		switch (element.type) {
			case ElementType.TEXT: {
				const html = element.textTypeData?.html;

				if (!html) {
					return err('No html field on textTypeData');
				}

				const doc = context.docParser(html);

				return flattenTextElement(doc).map(ok);
			}

			case ElementType.IMAGE:
				return pipe(
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

				return ok({
					kind: ElementKind.Interactive,
					url: iframeUrl,
					alt: fromNullable(alt),
				});
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
					resultMap((content) => ({
						kind: ElementKind.Tweet,
						content,
					})),
				);
			}

			case ElementType.EMBED: {
				const { html: embedHtml } = element.embedTypeData ?? {};

				if (!embedHtml) {
					return err('No html field on embedTypeData');
				}

				const id = context
					.docParser(embedHtml)
					.querySelector('[data-callout-tagname]')
					?.getAttribute('data-callout-tagname');

				if (id) {
					if (!campaigns) {
						return err('No campaign data for this callout');
					}

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

				return compose(
					toEmbedElement,
					parseGeneric(context.docParser),
				)(element);
			}

			case ElementType.MEMBERSHIP: {
				const {
					linkText,
					originalUrl: url,
					price,
					start,
					image,
				} = element.membershipTypeData ?? {};

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

			case ElementType.INSTAGRAM:
				return compose(toEmbedElement, parseInstagram)(element);

			case ElementType.AUDIO:
				return compose(
					toEmbedElement,
					parseAudio(context.docParser),
				)(element);

			case ElementType.VIDEO:
				return compose(toEmbedElement, parseVideo)(element);

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

const parseElements =
	(context: Context, atoms?: Atoms, campaigns?: Campaign[]) =>
	(elements: Elements): Array<Result<string, BodyElement>> => {
		if (!elements) {
			return [err('No body elements available')];
		}
		return elements.flatMap(parse(context, atoms, campaigns));
	};

// ----- Exports ----- //

export {
	ElementKind,
	BodyElement,
	Body,
	Image,
	Text,
	Embed,
	GuideAtom,
	InteractiveAtom,
	MediaAtom,
	QandaAtom,
	ProfileAtom,
	TimelineAtom,
	AudioAtom,
	parseElements,
	NewsletterSignUp,
};
