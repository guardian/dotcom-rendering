// ----- Imports ----- //

import { css, jsx as styledH } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Breakpoint } from '@guardian/source-foundations';
import { neutral, remSpace, until } from '@guardian/source-foundations';
import {
	andThen,
	fromNullable,
	map,
	none,
	OptionKind,
	some,
	withDefault,
} from '../vendor/@guardian/types/index';
import type { Option } from '../vendor/@guardian/types/index';
import { getAdPlaceholderInserter } from 'ads';
import { ElementKind } from 'bodyElement';
import type {
	BodyElement,
	Image,
	MediaAtom as MediaAtomElement,
	Text,
} from 'bodyElement';
import Anchor from 'components/Anchor';
import Blockquote from 'components/Blockquote';
import BodyImage from 'components/BodyImage';
import Bullet from 'components/Bullet';
import Callout from 'components/Callout';
import Caption from 'components/caption';
import { CaptionIconVariant } from 'components/CaptionIcon';
import Credit from 'components/Credit';
import GalleryImage from 'components/editions/galleryImage';
import EditionsPullquote from 'components/editions/pullquote';
import Video from 'components/editions/video';
import EmbedComponentWrapper from 'components/EmbedWrapper';
import FigCaption from 'components/FigCaption';
import HeadingTwo from 'components/HeadingTwo';
import HorizontalRule from 'components/HorizontalRule';
import Interactive from 'components/Interactive';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LiveEventLink from 'components/LiveEventLink';
import NewsletterSignup from 'components/NewsletterSignup';
import OrderedList from 'components/OrderedList';
import Paragraph from 'components/Paragraph';
import Pullquote from 'components/Pullquote';
import RichLink from 'components/RichLink';
import SpecialReportAltAtom from 'components/SpecialReportAltAtom';
import { isElement, pipe } from 'lib';
import { Optional } from 'optional';
import { border, text } from 'palette';
import { createElement as h } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Result } from 'result';
import { backgroundColor, darkModeCss } from 'styles';

// ----- Renderer ----- //

const getAttrs = (node: Node): Option<NamedNodeMap> =>
	isElement(node) ? some(node.attributes) : none;

const transformHref = (href: string): string => {
	if (href.startsWith('profile/')) {
		return `https://www.theguardian.com/${href}`;
	}

	return Result.fromUnsafe(() => new URL(href), 'invalid url')
		.toOptional()
		.map((url) => {
			const path = url.pathname.split('/');
			const isLatest =
				url.hostname === 'www.theguardian.com' &&
				path[path.length - 1] === 'latest';

			if (isLatest) {
				return href.slice(0, -7);
			}

			return href;
		})
		.withDefault(href);
};

const getHref = (node: Node): Option<string> =>
	pipe(
		getAttrs(node),
		andThen((attrs) =>
			pipe(
				attrs.getNamedItem('href'),
				fromNullable,
				map((attr) => transformHref(attr.value)),
			),
		),
	);

const transform = (
	text: string,
	format: ArticleFormat,
): ReactElement | string => {
	if (text.includes('•')) {
		return h(Bullet, { format, text });
	} else if (text.includes('* * *')) {
		return h(HorizontalRule, null, null);
	}
	return text;
};

const TweetStyles = css`
	${until.wide} {
		clear: both;
	}
`;

const allowsDropCaps = (format: ArticleFormat): boolean => {
	if (format.theme === ArticleSpecial.Labs) return false;
	if (format.display === ArticleDisplay.Immersive) return true;
	switch (format.design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Comment:
		case ArticleDesign.Review:
		case ArticleDesign.Interview:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Recipe:
			return true;
		default:
			return false;
	}
};

//Elements rendered by this function should contain no styles.
// For example in callout form and interactives we want to exclude styles.
const plainTextElement = (node: Node, key: number): ReactNode => {
	const text = node.textContent ?? '';
	const children = Array.from(node.childNodes).map(plainTextElement);
	switch (node.nodeName) {
		case 'P':
			return h('p', { key }, children);
		case '#text':
			return text;
		case 'SPAN':
			return text;
		case 'A':
			return h(
				'a',
				{ href: withDefault('')(getHref(node)), key },
				children,
			);
		case 'H2':
			return h('h2', { key }, children);
		case 'BLOCKQUOTE':
			return h('blockquote', { key }, children);
		case 'STRONG':
			return h('strong', { key }, children);
		case 'EM':
			return h('em', { key }, children);
		case 'BR':
			return h('br', { key }, null);
		case 'UL':
			return h('ul', { key }, children);
		case 'OL':
			return h('ol', { key }, children);
		case 'LI':
			return h('li', { key }, children);
		case 'MARK':
			return styledH('mark', { key }, children);
		case 'SUB':
			return h('sub', { key }, children);
		case 'SUP':
			return h('sup', { key }, children);
		default:
			return null;
	}
};

const shouldShowDropCap = (
	text: string,
	format: ArticleFormat,
	positionAllowsDropCap: boolean,
	isEditions: boolean,
): boolean => {
	if (isEditions) {
		return false;
	}
	return (
		allowsDropCaps(format) && text.length >= 200 && positionAllowsDropCap
	);
};

const textElement =
	(format: ArticleFormat, isEditions = false) =>
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(
			textElement(format, isEditions),
		);
		switch (node.nodeName) {
			case 'P': {
				if (text === '* * *') {
					return children;
				}

				const isFirstParagraph = node.previousSibling === null;
				const isAfterDinkus =
					node.previousSibling?.previousSibling?.textContent ===
					'* * *';

				const showDropCap = shouldShowDropCap(
					text,
					format,
					isFirstParagraph || isAfterDinkus,
					isEditions,
				);

				return h(
					Paragraph,
					{ key, format, showDropCap, isEditions },
					children,
				);
			}
			case '#text':
				return transform(text, format);
			case 'SPAN':
				return text;
			case 'A':
				return h(
					Anchor,
					{
						href: withDefault('')(getHref(node)),
						format,
						key,
						isEditions,
					},
					children,
				);
			case 'BLOCKQUOTE':
				return isEditions
					? h('blockquote', { key }, children)
					: h(Blockquote, { key, format }, children);
			case 'STRONG':
				return styledH(
					'strong',
					{ css: { fontWeight: 'bold' }, key },
					children,
				);
			case 'B':
				return h('b', { key }, children);
			case 'EM':
				return h('em', { key }, children);
			case 'BR':
				return h('br', { key }, null);
			case 'UL':
				return h(List, { children, format, usePillarColour: false });
			case 'OL':
				return h(OrderedList, { children });
			case 'LI':
				return h(ListItem, { children });
			case 'MARK':
				return styledH('mark', { key }, children);
			case 'SUB':
				return h('sub', { key }, children);
			case 'SUP':
				return styledH(
					'sup',
					{
						key,
						css: {
							fontSize: 'smaller',
							verticalAlign: 'super',
						},
					},
					children,
				);
			default:
				return null;
		}
	};

const isBlog = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.LiveBlog ||
	format.design === ArticleDesign.DeadBlog;

const borderFromFormat = (format: ArticleFormat): string => {
	const styles = `
		border-bottom: 0.0625rem solid ${border.standfirstLink(format)};
		text-decoration: none;
	`;

	return isBlog(format) || format.design === ArticleDesign.Gallery
		? styles
		: 'none';
};

const calloutDescriptionTextElement =
	(format: ArticleFormat) =>
	(node: Node, key: number): ReactNode => {
		const children = Array.from(node.childNodes).map(
			calloutDescriptionTextElement(format),
		);
		switch (node.nodeName) {
			case 'P':
				return h('p', { key }, children);
			case 'STRONG':
				return styledH(
					'strong',
					{ css: { fontWeight: 'bold' }, key },
					children,
				);
			case 'A': {
				const url = withDefault('')(getHref(node));
				const href = url.startsWith('profile/')
					? `https://www.theguardian.com/${url}`
					: url;
				return styledH('a', { key, href }, children);
			}
			default:
				return textElement(format)(node, key);
		}
	};

const standfirstTextElement =
	(format: ArticleFormat) =>
	(node: Node, key: number): ReactNode => {
		const children = Array.from(node.childNodes).map(
			standfirstTextElement(format),
		);
		switch (node.nodeName) {
			case 'P':
				return h('p', { key }, children);
			case 'STRONG':
				return styledH(
					'strong',
					{ css: { fontWeight: 'bold' }, key },
					children,
				);
			case 'UL':
				return styledH(List, {
					children,
					format,
					usePillarColour: true,
				});
			case 'LI':
				return h(ListItem, { children });
			case 'A': {
				const styles = css`
					color: ${text.standfirstLink(format)};
					${borderFromFormat(format)};

					${darkModeCss`
						color: ${text.standfirstLinkDark(format)};
					`}
				`;
				const url = withDefault('')(getHref(node));
				const href = url.startsWith('profile/')
					? `https://www.theguardian.com/${url}`
					: url;
				return styledH('a', { key, href, css: styles }, children);
			}
			default:
				return textElement(format)(node, key);
		}
	};

const renderText = (
	doc: Node,
	format: ArticleFormat,
	isEditions = false,
): ReactNode => textElement(format, isEditions)(doc, 0);

const editionsStandfirstFilter = (node: Node): boolean =>
	!['UL', 'LI', 'A'].includes(node.nodeName);

const standfirstText = (
	doc: DocumentFragment,
	format: ArticleFormat,
	isEditions?: boolean,
): ReactNode[] => {
	const nodes = Array.from(doc.childNodes);
	const filteredNodes = isEditions
		? nodes.filter(editionsStandfirstFilter)
		: nodes;
	return filteredNodes.map(standfirstTextElement(format));
};

const calloutDescriptionText = (
	format: ArticleFormat,
	doc?: DocumentFragment,
): ReactNode[] => {
	if (!doc) return [];
	const nodes = Array.from(doc.childNodes);
	const filteredNodes = nodes.filter(
		(node) => !['A'].includes(node.nodeName),
	);
	return filteredNodes.map(calloutDescriptionTextElement(format));
};

const Tweet = (props: {
	content: NodeList;
	format: ArticleFormat;
	key: number;
}): ReactElement =>
	// twitter script relies on twitter-tweet class being present
	styledH(
		'blockquote',
		{ key: props.key, className: 'twitter-tweet', css: TweetStyles },
		...Array.from(props.content).map(textElement(props.format)),
	);

const imageRenderer = (
	format: ArticleFormat,
	element: Image,
	key: number,
): ReactNode => {
	const { caption, credit, nativeCaption } = element;

	const maybeCaption: Optional<ReactNode> =
		caption.kind === OptionKind.Some || credit.kind === OptionKind.Some
			? Optional.some([
					h(Caption, { format, caption }),
					h(Credit, { credit, format, key }),
			  ])
			: Optional.none();

	return h(BodyImage, {
		caption: maybeCaption,
		format,
		key,
		lightbox: some({
			className: 'js-launch-slideshow',
			caption: nativeCaption,
			credit,
		}),
		image: element,
		leftColumnBreakpoint: some<Breakpoint>('wide'),
	});
};

const textRenderer = (
	format: ArticleFormat,
	excludeStyles: boolean,
	element: Text,
	isEditions?: boolean,
): ReactNode => {
	return excludeStyles
		? Array.from(element.doc.childNodes).map(plainTextElement)
		: renderText(element.doc, format, isEditions);
};

const mediaAtomRenderer = (
	format: ArticleFormat,
	element: MediaAtomElement,
	isEditions: boolean,
): ReactNode => {
	const { posterUrl, videoId, duration, caption } = element;

	const styles = css`
		width: 100%;
		padding-bottom: 56.25%;
		margin: 0;
		background: ${backgroundColor(format)};
		${darkModeCss`
			background: ${neutral[20]};
		`}
	`;

	const figureAttributes = {
		css: css`
			margin: ${remSpace[4]} 0;
		`,
	};

	const attributes = {
		'data-posterurl': posterUrl,
		'data-videoid': videoId,
		'data-duration': withDefault<number | null>(null)(duration),
		className: 'js-native-video',
		css: styles,
	};
	const figcaption = h(FigCaption, {
		format: format,
		children: Optional.some(h(Caption, { caption, format })),
		variant: CaptionIconVariant.Video,
	});
	return styledH('figure', figureAttributes, [
		isEditions
			? h(Video, {
					atomId: element.id,
					title: element.title,
			  })
			: styledH('div', attributes),
		figcaption,
	]);
};

const renderElement =
	(format: ArticleFormat, excludeStyles = false) =>
	(element: BodyElement, key: number): ReactNode => {
		switch (element.kind) {
			case ElementKind.Text:
				return textRenderer(format, excludeStyles, element);
			case ElementKind.HeadingTwo:
				return h(HeadingTwo, {
					format,
					isEditions: false,
					heading: element,
				});
			case ElementKind.Image:
				return imageRenderer(format, element, key);

			case ElementKind.Pullquote: {
				const { quote, attribution } = element;
				return h(Pullquote, { quote, attribution, format, key });
			}

			case ElementKind.RichLink: {
				const { url, linkText } = element;
				return h(RichLink, { url, linkText, key, format });
			}

			case ElementKind.LiveEvent: {
				return h(LiveEventLink, { ...element, key });
			}

			case ElementKind.Interactive:
				return h(Interactive, {
					url: element.url,
					key,
					title: element.alt,
				});

			case ElementKind.Tweet:
				return h(Tweet, { content: element.content, format, key });

			case ElementKind.Callout:
				return h(Callout, { format, ...element });

			case ElementKind.Embed:
				return h(EmbedComponentWrapper, {
					embed: element.embed,
					editions: false,
				});

			// These atoms are not supported in AR.
			case ElementKind.ExplainerAtom:
			case ElementKind.GuideAtom:
			case ElementKind.QandaAtom:
			case ElementKind.ProfileAtom:
			case ElementKind.TimelineAtom:
			case ElementKind.ChartAtom:
			case ElementKind.InteractiveAtom:
			case ElementKind.AudioAtom:
			case ElementKind.KnowledgeQuizAtom:
			case ElementKind.PersonalityQuizAtom:
				return null;

			case ElementKind.MediaAtom:
				return mediaAtomRenderer(format, element, false);

			case ElementKind.NewsletterSignUp:
				return h(NewsletterSignup, {
					format,
					element,
					skipLinkIdSuffix: key.toString(),
				});

			case ElementKind.SpecialReportAltAtom:
				return h(SpecialReportAltAtom, { format });
		}
	};

const renderEditions =
	(format: ArticleFormat, excludeStyles = false) =>
	(element: BodyElement, key: number): ReactNode => {
		switch (element.kind) {
			case ElementKind.Text:
				return textRenderer(format, excludeStyles, element, true);

			case ElementKind.HeadingTwo:
				return h(HeadingTwo, {
					format,
					isEditions: true,
					heading: element,
				});

			case ElementKind.Image:
				return format.design === ArticleDesign.Gallery ||
					format.design === ArticleDesign.Audio ||
					format.design === ArticleDesign.Video ||
					format.design === ArticleDesign.Picture
					? h(GalleryImage, { format, image: element })
					: imageRenderer(format, element, key);

			case ElementKind.Pullquote: {
				const { quote, attribution } = element;
				return h(EditionsPullquote, {
					quote,
					attribution,
					format,
					key,
				});
			}

			case ElementKind.LiveEvent:
				return h(LiveEventLink, { ...element, key });

			case ElementKind.Tweet:
				return h(Tweet, { content: element.content, format, key });

			case ElementKind.Embed:
				return h(EmbedComponentWrapper, {
					embed: element.embed,
					editions: true,
				});

			case ElementKind.MediaAtom:
				return mediaAtomRenderer(format, element, true);

			default:
				return null;
		}
	};

const renderElements = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(renderElement(format));

const renderEditionsElements = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(renderEditions(format));

const renderWithoutStyles = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(renderElement(format, true));

const render = (
	shouldHideAdverts: boolean,
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] =>
	getAdPlaceholderInserter(shouldHideAdverts)(
		renderElements(format, elements),
		format,
	);

// ----- Exports ----- //

export {
	renderElements,
	renderEditionsElements,
	renderWithoutStyles,
	renderText,
	textElement as renderTextElement,
	standfirstText as renderStandfirstText,
	calloutDescriptionText as renderCalloutDescriptionText,
	getHref,
	transformHref,
	plainTextElement,
	shouldShowDropCap,
	render,
};
