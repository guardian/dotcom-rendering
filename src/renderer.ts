// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import {
	AudioAtom,
	ChartAtom,
	ExplainerAtom,
	GuideAtom,
	KnowledgeQuizAtom,
	PersonalityQuizAtom,
	ProfileAtom,
	QandaAtom,
	TimelineAtom,
} from '@guardian/atoms-rendering';
import { BodyImage, FigCaption } from '@guardian/image-rendering';
import { palette, remSpace } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import type { Breakpoint } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import {
	andThen,
	Design,
	fromNullable,
	fromUnsafe,
	map,
	none,
	some,
	Special,
	toOption,
	withDefault,
} from '@guardian/types';
import type { Format, Option, Result } from '@guardian/types';
import { ElementKind } from 'bodyElement';
import type {
	AudioAtom as AudioAtomElement,
	BodyElement,
	GuideAtom as GuideAtomElement,
	Image,
	InteractiveAtom as InteractiveAtomElement,
	KnowledgeQuizAtom as KnowledgeQuizAtomElement,
	MediaAtom as MediaAtomElement,
	PersonalityQuizAtom as PersonalityQuizAtomElement,
	ProfileAtom as ProfileAtomElement,
	QandaAtom as QandaAtomElement,
	Text,
	TimelineAtom as TimelineAtomElement,
} from 'bodyElement';
import Anchor from 'components/anchor';
import InteractiveAtom, {
	atomCss,
	atomScript,
} from 'components/atoms/interactiveAtom';
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
import LiveEventLink from 'components/liveEventLink';
import Paragraph from 'components/paragraph';
import Pullquote from 'components/pullquote';
import RichLink from 'components/richLink';
import { isElement, pipe } from 'lib';
import { createElement as h } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { darkModeCss } from 'styles';
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

const transform = (text: string, format: Format): ReactElement | string => {
	if (text.includes('•')) {
		return h(Bullet, { format, text });
	} else if (text.includes('* * *')) {
		return h(HorizontalRule, null, null);
	}
	return text;
};

const listStyles: SerializedStyles = css`
	list-style: none;
	margin: ${remSpace[3]} 0;
	padding-left: 0;
	clear: both;
`;

const listItemStyles = (format: Format): SerializedStyles[] => {
	const baseStyles = css`
		padding-left: ${remSpace[6]};
		padding-bottom: 0.375rem;

		&::before {
			display: inline-block;
			content: '';
			border-radius: 0.5rem;
			height: 1rem;
			width: 1rem;
			margin-right: ${remSpace[3]};
			background-color: ${neutral[86]};
			margin-left: -${remSpace[6]};
			vertical-align: middle;
		}

		> p:first-of-type {
			display: inline;
			padding: 0;
		}

		${darkModeCss`
            &::before {
                background-color: ${neutral[46]};
            }
        `}
	`;

	const mediaStyles = css`
		&::before {
			background-color: ${neutral[46]};
		}
	`;

	const liveblogStyles = css`
		${darkModeCss`
            &::before {
                background-color: ${neutral[86]};
            }
        `}
	`;

	switch (format.design) {
		case Design.Media:
			return [baseStyles, mediaStyles];
		case Design.LiveBlog:
			return [baseStyles, liveblogStyles];
		default:
			return [baseStyles];
	}
};

const HeadingTwoStyles = (format: Format): SerializedStyles => {
	const font =
		format.theme === Special.Labs
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
		case 'LI':
			return h('li', { key }, children);
		case 'MARK':
			return styledH('mark', { key }, children);
		default:
			return null;
	}
};

const textElement = (format: Format, supportsDarkMode = true) => (
	node: Node,
	key: number,
): ReactNode => {
	const text = node.textContent ?? '';
	const children = Array.from(node.childNodes).map(
		textElement(format, supportsDarkMode),
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
					supportsDarkMode,
				},
				transform(text, format),
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
			return h(Blockquote, { key, format }, children);
		case 'STRONG':
			return h('strong', { key }, children);
		case 'B':
			return h('b', { key }, children);
		case 'EM':
			return h('em', { key }, children);
		case 'BR':
			return h('br', { key }, null);
		case 'UL':
			return styledH('ul', { css: listStyles }, children);
		case 'LI':
			return styledH('li', { css: listItemStyles(format) }, children);
		case 'MARK':
			return styledH('mark', { key }, children);
		default:
			return null;
	}
};

const linkColourFromFormat = (format: Format): string => {
	if (format.theme === Special.Labs) {
		return palette.labs[300];
	}

	const { kicker, inverted } = getThemeStyles(format.theme);
	return format.design === Design.Media ? inverted : kicker;
};

const standfirstTextElement = (format: Format) => (
	node: Node,
	key: number,
): ReactNode => {
	const children = Array.from(node.childNodes).map(
		standfirstTextElement(format),
	);
	switch (node.nodeName) {
		case 'P':
			return h('p', { key }, children);
		case 'STRONG':
			return h('strong', { key }, children);
		case 'UL':
			return styledH('ul', { css: listStyles }, children);
		case 'LI':
			return styledH('li', { css: listItemStyles(format) }, children);
		case 'A': {
			const colour = linkColourFromFormat(format);
			const styles = css`
				color: ${colour};
				text-decoration: none;
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

const noLinksStandfirstTextElement = (format: Format) => (
	node: Node,
	key: number,
): ReactNode => {
	const children = Array.from(node.childNodes).map(
		standfirstTextElement(format),
	);
	switch (node.nodeName) {
		case 'P':
			return h('p', { key }, children);
		case 'STRONG':
			return h('strong', { key }, children);
		default:
			return null;
	}
};

const text = (
	doc: DocumentFragment,
	format: Format,
	supportsDarkMode = true,
): ReactNode[] =>
	Array.from(doc.childNodes).map(textElement(format, supportsDarkMode));
const standfirstText = (
	doc: DocumentFragment,
	format: Format,
	noLinks?: boolean,
): ReactNode[] =>
	Array.from(doc.childNodes).map(
		noLinks
			? noLinksStandfirstTextElement(format)
			: standfirstTextElement(format),
	);

const Tweet = (props: {
	content: NodeList;
	format: Format;
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

const captionElement = (format: Format) => (
	node: Node,
	key: number,
): ReactNode => {
	const text = node.textContent ?? '';
	const children = Array.from(node.childNodes).map(captionElement(format));
	switch (node.nodeName) {
		case 'STRONG':
			return format.design === Design.Media
				? styledH('h2', { css: captionHeadingStyles, key }, children)
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
						format.design === Design.Media
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
			return h('span', { key }, text);
		default:
			return textElement(format)(node, key);
	}
};

const renderCaption = (doc: DocumentFragment, format: Format): ReactNode[] =>
	Array.from(doc.childNodes).map(captionElement(format));

const imageRenderer = (
	format: Format,
	element: Image,
	key: number,
): ReactNode => {
	const { caption, credit, nativeCaption } = element;

	return h(BodyImage, {
		caption: map<DocumentFragment, ReactNode>((cap) => [
			renderCaption(cap, format),
			h(Credit, { credit, format, key }),
		])(caption),
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
	format: Format,
	excludeStyles: boolean,
	element: Text,
	supportsDarkMode?: boolean,
): ReactNode => {
	return excludeStyles
		? Array.from(element.doc.childNodes).map(plainTextElement)
		: text(element.doc, format, supportsDarkMode);
};

const guideAtomRenderer = (
	format: Format,
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
	format: Format,
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
	format: Format,
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
	format: Format,
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
	format: Format,
	element: InteractiveAtomElement,
): ReactNode => {
	const { html, css: styles, js } = element;
	if (format.design !== Design.Interactive) {
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
	format: Format,
	element: MediaAtomElement,
	isEditions: boolean,
): ReactNode => {
	const { posterUrl, videoId, duration, caption } = element;

	const backgroundColor = (format: Format): string =>
		format.design === Design.Comment ? neutral[86] : neutral[97];

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
		format,
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
	format: Format,
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
		h(AudioAtom, { ...element, pillar }),
	);
};

const quizAtomRenderer = (
	format: Format,
	element: KnowledgeQuizAtomElement | PersonalityQuizAtomElement,
): ReactNode => {
	const props = JSON.stringify(element);
	const hydrationParams = h(
		'script',
		{ className: 'js-quiz-params', type: 'application/json' },
		props,
	);
	if (element.kind === ElementKind.KnowledgeQuizAtom) {
		return h('div', { className: 'js-quiz' }, [
			hydrationParams,
			h(KnowledgeQuizAtom, { ...element }),
		]);
	}
	return h('div', { className: 'js-quiz' }, [
		hydrationParams,
		h(PersonalityQuizAtom, { ...element }),
	]);
};

const render = (format: Format, excludeStyles = false) => (
	element: BodyElement,
	key: number,
): ReactNode => {
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
			return quizAtomRenderer(format, element);
	}
};

const renderEditions = (format: Format, excludeStyles = false) => (
	element: BodyElement,
	key: number,
): ReactNode => {
	switch (element.kind) {
		case ElementKind.Text:
			return textRenderer(format, excludeStyles, element, false);

		case ElementKind.Image:
			return format.design === Design.Media
				? h(GalleryImage, { format, image: element })
				: imageRenderer(format, element, key);

		case ElementKind.Pullquote: {
			const { quote, attribution } = element;
			return h(EditionsPullquote, { quote, attribution, format, key });
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

		case ElementKind.ExplainerAtom:
			return h(ExplainerAtom, { ...element });

		case ElementKind.GuideAtom:
			return guideAtomRenderer(format, element);

		case ElementKind.QandaAtom:
			return qandaAtomRenderer(format, element);

		case ElementKind.ProfileAtom:
			return profileAtomRenderer(format, element);

		case ElementKind.TimelineAtom:
			return timelineAtomRenderer(format, element);

		case ElementKind.InteractiveAtom:
			return interactiveAtomRenderer(format, element);

		case ElementKind.MediaAtom:
			return mediaAtomRenderer(format, element, true);

		default:
			return null;
	}
};

const renderAll = (format: Format, elements: BodyElement[]): ReactNode[] =>
	elements.map(render(format));

const renderEditionsAll = (
	format: Format,
	elements: BodyElement[],
): ReactNode[] => elements.map(renderEditions(format));

const renderAllWithoutStyles = (
	format: Format,
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
