// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
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
import BodyImage from '@guardian/common-rendering/src/components/bodyImage';
import FigCaption from '@guardian/common-rendering/src/components/figCaption';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import type { Breakpoint } from '@guardian/src-foundations/mq';
import { labs, neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import {
	andThen,
	fromNullable,
	fromUnsafe,
	map,
	none,
	some,
	toOption,
	withDefault,
} from '@guardian/types';
import type { Option, Result } from '@guardian/types';
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
import Anchor from 'components/anchor';
import Quiz from 'components/atoms/quiz';
import Blockquote from 'components/blockquote';
import Bullet from 'components/bullet';
import CalloutForm from 'components/calloutForm';
import Credit from 'components/credit';
import GalleryImage from 'components/editions/galleryImage';
import EditionsPullquote from 'components/editions/pullquote';
import Video from 'components/editions/video';
import { EmbedComponentWrapper } from 'components/embedWrapper';
import HorizontalRule from 'components/horizontalRule';
import Interactive from 'components/interactive';
import InteractiveAtom, {
	atomCss,
	atomScript,
} from 'components/interactiveAtom';
import List from 'components/list';
import ListItem from 'components/listItem';
import LiveEventLink from 'components/liveEventLink';
import OrderedList from 'components/orderedList';
import Paragraph from 'components/paragraph';
import Pullquote from 'components/pullquote';
import RichLink from 'components/richLink';
import { isElement, pipe } from 'lib';
import { createElement as h } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { backgroundColor, darkModeCss } from 'styles';
import {
	getThemeStyles,
	themeFromString,
	themeToPillar,
	themeToPillarString,
} from 'themeStyles';

// ----- Renderer ----- //

const getAttrs = (node: Node): Option<NamedNodeMap> =>
	isElement(node) ? some(node.attributes) : none;

const transformHref = (href: string): string => {
	if (href.startsWith('profile/')) {
		return `https://www.theguardian.com/${href}`;
	}

	const url: Result<string, URL> = fromUnsafe(
		() => new URL(href),
		'invalid url',
	);

	return pipe(
		toOption(url),
		map((url) => {
			const path = url.pathname.split('/');
			const isLatest =
				url.hostname === 'www.theguardian.com' &&
				path[path.length - 1] === 'latest';

			if (isLatest) {
				return href.slice(0, -7);
			}

			return href;
		}),
		withDefault(href),
	);
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

const HeadingTwoStyles = (format: ArticleFormat): SerializedStyles => {
	const font =
		format.theme === ArticleSpecial.Labs
			? textSans.large({ fontWeight: 'bold' })
			: headline.xxsmall({ fontWeight: 'bold' });

	return css`
		${font}
		margin: ${remSpace[4]} 0 4px 0;

		& + p {
			margin-top: 0;
		}
	`;
};

const TweetStyles = css`
	${until.wide} {
		clear: both;
	}
`;

//Elements rendered by this function should contain no styles. For example in callout form and interactives we want to exclude styles.
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

const textElement =
	(format: ArticleFormat, isEditions = false) =>
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(
			textElement(format, isEditions),
		);
		switch (node.nodeName) {
			case 'P':
				return h(Paragraph, { key, format }, children);
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
			case 'H2':
				return text.includes('* * *')
					? h(HorizontalRule, null, null)
					: styledH(
							'h2',
							{ css: HeadingTwoStyles(format), key },
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
				return h(List, { children });
			case 'OL':
				return h(OrderedList, { children });
			case 'LI':
				return h(ListItem, { format, children });
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

const isBlog = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.LiveBlog ||
	format.design === ArticleDesign.DeadBlog;

const linkColourFromFormat = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) {
		return labs[300];
	}

	if (isBlog(format)) {
		return neutral[100];
	}

	const { kicker, inverted } = getThemeStyles(format.theme);
	return format.design === ArticleDesign.Media ? inverted : kicker;
};

const borderFromFormat = (format: ArticleFormat): string => {
	const { liveblogKicker } = getThemeStyles(format.theme);

	const styles = `
		border-bottom: 0.0625rem solid ${liveblogKicker};
		text-decoration: none;
	`;

	return isBlog(format) ? styles : 'none';
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
				return h(List, { children });
			case 'LI':
				return h(ListItem, { format, children });
			case 'A': {
				const styles = css`
					color: ${linkColourFromFormat(format)};
					${borderFromFormat(format)};
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

const text = (
	doc: DocumentFragment,
	format: ArticleFormat,
	isEditions = false,
): ReactNode[] =>
	Array.from(doc.childNodes).map(textElement(format, isEditions));

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

const captionHeadingStyles = css`
	${headline.xxxsmall()}
	color: ${neutral[86]};
	margin: 0 0 ${remSpace[3]};
	display: block;
`;

const captionElement =
	(format: ArticleFormat) =>
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(
			captionElement(format),
		);
		switch (node.nodeName) {
			case 'STRONG':
				return format.design === ArticleDesign.Media
					? styledH(
							'h2',
							{ css: captionHeadingStyles, key },
							children,
					  )
					: children;
			case 'BR':
				return null;
			case 'EM':
				return styledH(
					'em',
					{
						css: css`
							${textSans.xsmall({
								fontStyle: 'italic',
								fontWeight: 'bold',
							})}
						`,
						key,
					},
					children,
				);
			case 'A':
				return styledH(
					Anchor,
					{
						href: withDefault('')(getHref(node)),
						className:
							format.design === ArticleDesign.Media
								? css`
										color: ${neutral[86]};
								  `
								: undefined,
						format,
						key,
					},
					children,
				);
			case '#text':
				return styledH(
					'span',
					{
						css: css`
							${textSans.xxsmall()}
						`,
						key,
					},
					text,
				);
			default:
				return textElement(format)(node, key);
		}
	};

const renderCaption = (
	doc: DocumentFragment,
	format: ArticleFormat,
): ReactNode[] => Array.from(doc.childNodes).map(captionElement(format));

const imageRenderer = (
	format: ArticleFormat,
	element: Image,
	key: number,
): ReactNode => {
	const { caption, credit, nativeCaption } = element;
	return h(BodyImage, {
		caption: map<DocumentFragment, ReactNode>((cap) => [
			renderCaption(cap, format),
			h(Credit, { credit, format, key }),
		])(caption),
		format: format,
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
		: text(element.doc, format, isEditions);
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
		'data-posterUrl': posterUrl,
		'data-videoId': videoId,
		'data-duration': duration,
		className: 'native-video',
		css: styles,
	};
	const figcaption = h(FigCaption, {
		format: format,
		supportsDarkMode: true,
		children: map((cap: DocumentFragment) => renderCaption(cap, format))(
			caption,
		),
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
	const { theme } = format;
	const pillar = themeFromString('pillar/' + themeToPillarString(theme));
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
		}
	};

const renderEditions =
	(format: ArticleFormat, excludeStyles = false) =>
	(element: BodyElement, key: number): ReactNode => {
		switch (element.kind) {
			case ElementKind.Text:
				return textRenderer(format, excludeStyles, element, true);

			case ElementKind.Image:
				return format.design === ArticleDesign.Media
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
	text as renderText,
	textElement as renderTextElement,
	standfirstText as renderStandfirstText,
	getHref,
	transformHref,
	plainTextElement,
	renderCaption,
};
