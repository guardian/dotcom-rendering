// ----- Imports ----- //

import { css, jsx as styledH } from '@emotion/react';
import {
	AudioAtom,
	ChartAtom,
	ExplainerAtom,
	GuideAtom,
	ProfileAtom,
	QandaAtom,
	TimelineAtom,
} from '@guardian/atoms-rendering';
import { CaptionIconVariant } from '@guardian/common-rendering/src/components/captionIcon';
import FigCaption from '@guardian/common-rendering/src/components/figCaption';
import { border, text } from '@guardian/common-rendering/src/editorialPalette';
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
} from '@guardian/types';
import type { Option } from '@guardian/types';
import { themeToPillar } from 'articleFormat';
import { ElementKind } from 'bodyElement';
import type {
	AudioAtom as AudioAtomElement,
	BodyElement,
	GuideAtom as GuideAtomElement,
	Image,
	InteractiveAtom as InteractiveAtomElement,
	MediaAtom as MediaAtomElement,
	ProfileAtom as ProfileAtomElement,
	QandaAtom as QandaAtomElement,
	Text,
	TimelineAtom as TimelineAtomElement,
} from 'bodyElement';
import Anchor from 'components/Anchor';
import Quiz from 'components/atoms/quiz';
import Blockquote from 'components/Blockquote';
import BodyImage from 'components/BodyImage';
import Bullet from 'components/Bullet';
import CalloutForm from 'components/CalloutForm';
import Caption from 'components/caption';
import Credit from 'components/Credit';
import GalleryImage from 'components/editions/galleryImage';
import EditionsPullquote from 'components/editions/pullquote';
import Video from 'components/editions/video';
import EmbedComponentWrapper from 'components/EmbedWrapper';
import HeadingTwo from 'components/HeadingTwo';
import HorizontalRule from 'components/HorizontalRule';
import Interactive from 'components/Interactive';
import InteractiveAtom, {
	atomCss,
	atomScript,
} from 'components/InteractiveAtom';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LiveEventLink from 'components/LiveEventLink';
import NewsletterSignup from 'components/NewsletterSignup';
import OrderedList from 'components/OrderedList';
import Paragraph from 'components/Paragraph';
import Pullquote from 'components/Pullquote';
import RichLink from 'components/RichLink';
import { isElement, pipe } from 'lib';
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

/**
 * This regular expression checks that a string begins with a word that is at least
 * three characters long, ignoring the initial quotation mark.
 *
 *  The regex can be broken down as follows:
 *
 * - `["'\u2018\u201c]?` matches an optional quotation mark, apostrophe, open single quote
 * or open double quote.
 *
 * - `(?!I)` is a negative lookahead checking that the first letter is not "I".
 *
 * - The rest of the expression matches 3 or more characters in the Latin-1 Unicode block,
 * which includes diacritics (e.g. å, č, Ë, etc.).
 *
 * The regex sits outside the rendering function so it is only compiled once
 * for better performance.
 */
const dropCapRegex =
	/^["'\u2018\u201c]?(?!I)[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]{3,}/;

const shouldShowDropCap = (
	text: string,
	format: ArticleFormat,
	isEditions: boolean,
): boolean => {
	if (isEditions) {
		return false;
	}
	return (
		allowsDropCaps(format) && text.length >= 200 && dropCapRegex.test(text)
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

				const showDropCap = shouldShowDropCap(text, format, isEditions);

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
	doc: DocumentFragment,
	format: ArticleFormat,
): ReactNode[] => {
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

	const maybeCaption =
		caption.kind === OptionKind.Some || credit.kind === OptionKind.Some
			? some([
					h(Caption, { format, caption }),
					h(Credit, { credit, format, key }),
			  ])
			: none;

	return h(BodyImage, {
		caption: maybeCaption,
		format,
		key,
		supportsDarkMode: true,
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

const guideAtomRenderer = (
	format: ArticleFormat,
	element: GuideAtomElement,
): ReactNode => {
	return h(GuideAtom, {
		...element,
		pillar: themeToPillar(format.theme),
		likeHandler: () => {
			console.log('like clicked');
		},
		dislikeHandler: () => {
			console.log('dislike clicked');
		},
		expandCallback: () => {
			console.log('expand clicked');
		},
	});
};

const qandaAtomRenderer = (
	format: ArticleFormat,
	element: QandaAtomElement,
): ReactNode => {
	return h(QandaAtom, {
		...element,
		pillar: themeToPillar(format.theme),
		likeHandler: () => {
			console.log('like clicked');
		},
		dislikeHandler: () => {
			console.log('dislike clicked');
		},
		expandCallback: () => {
			console.log('expand clicked');
		},
	});
};

const profileAtomRenderer = (
	format: ArticleFormat,
	element: ProfileAtomElement,
): ReactNode => {
	return h(ProfileAtom, {
		...element,
		pillar: themeToPillar(format.theme),
		likeHandler: () => {
			console.log('like clicked');
		},
		dislikeHandler: () => {
			console.log('dislike clicked');
		},
		expandCallback: () => {
			console.log('expand clicked');
		},
	});
};

const timelineAtomRenderer = (
	format: ArticleFormat,
	element: TimelineAtomElement,
): ReactNode => {
	return h(TimelineAtom, {
		...element,
		pillar: themeToPillar(format.theme),
		likeHandler: () => {
			console.log('like clicked');
		},
		dislikeHandler: () => {
			console.log('dislike clicked');
		},
		expandCallback: () => {
			console.log('expand clicked');
		},
	});
};

const interactiveAtomRenderer = (
	format: ArticleFormat,
	element: InteractiveAtomElement,
): ReactNode => {
	const { html, css: styles, js } = element;
	if (format.design !== ArticleDesign.Interactive) {
		const fenced = `
			<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
					<style>${styles}</style>
					<style>${atomCss}</style>
				</head>
				<body>
					${html}
					<script>${withDefault('')(js)}</script>
					<script>${atomScript}</script>
				</body>
			</html>
		`;
		return h('iframe', { srcdoc: fenced });
	} else {
		return h(InteractiveAtom, { html, styles, js, format });
	}
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
		supportsDarkMode: true,
		children: some(h(Caption, { caption, format })),
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

const audioAtomRenderer = (
	format: ArticleFormat,
	element: AudioAtomElement,
): ReactNode => {
	const pillar = themeToPillar(format.theme);
	const audioAtomStyles = css`
		figure {
			margin: 0;
		}
	`;
	return styledH(
		'div',
		{
			...element,
			pillar,
			className: 'js-audio-atom',
			css: audioAtomStyles,
		},
		h(AudioAtom, { ...element, pillar, duration: 0 }),
	);
};

const render =
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

			case ElementKind.Callout: {
				const { campaign, description } = element;
				return h(CalloutForm, { campaign, format, description });
			}

			case ElementKind.Embed:
				return h(EmbedComponentWrapper, {
					embed: element.embed,
					editions: false,
				});

			case ElementKind.ExplainerAtom: {
				return h(ExplainerAtom, { ...element });
			}

			case ElementKind.GuideAtom:
				return guideAtomRenderer(format, element);

			case ElementKind.QandaAtom:
				return qandaAtomRenderer(format, element);

			case ElementKind.ProfileAtom:
				return profileAtomRenderer(format, element);

			case ElementKind.TimelineAtom:
				return timelineAtomRenderer(format, element);

			case ElementKind.ChartAtom: {
				return h(ChartAtom, { ...element });
			}

			case ElementKind.InteractiveAtom:
				return interactiveAtomRenderer(format, element);

			case ElementKind.MediaAtom:
				return mediaAtomRenderer(format, element, false);

			case ElementKind.AudioAtom:
				return audioAtomRenderer(format, element);

			case ElementKind.KnowledgeQuizAtom:
			case ElementKind.PersonalityQuizAtom:
				return h(Quiz, { format, element });

			case ElementKind.NewsletterSignUp:
				return h(NewsletterSignup, { format, element });
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
					format.design === ArticleDesign.Video
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

const renderAll = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(render(format));

const renderEditionsAll = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(renderEditions(format));

const renderAllWithoutStyles = (
	format: ArticleFormat,
	elements: BodyElement[],
): ReactNode[] => elements.map(render(format, true));

// ----- Exports ----- //

export {
	renderAll,
	renderEditionsAll,
	renderAllWithoutStyles,
	renderText,
	textElement as renderTextElement,
	standfirstText as renderStandfirstText,
	calloutDescriptionText as renderCalloutDescriptionText,
	getHref,
	transformHref,
	plainTextElement,
	shouldShowDropCap,
};
