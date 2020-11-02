// ----- Imports ----- //

import { createElement as h, ReactElement, ReactNode } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { Breakpoint, from, until } from '@guardian/src-foundations/mq';
import { neutral, text as textColour } from '@guardian/src-foundations/palette';
import { Option, fromNullable, some, none, andThen, map, withDefault } from '@guardian/types/option';
import { basePx, darkModeCss } from 'styles';
import { getThemeStyles, themeFromString, themeToPillar } from 'themeStyles';
import { Format } from '@guardian/types/Format';
import { BodyElement, ElementKind } from 'bodyElement';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { palette, remSpace } from '@guardian/src-foundations';
import Audio from 'components/audio';
import Video from 'components/video';
import Paragraph from 'components/paragraph';
import BodyImage from '@guardian/image-rendering/src/components/bodyImage';
import FigCaption from '@guardian/image-rendering/src/components/figCaption';
import Anchor from 'components/anchor';
import InteractiveAtom, {atomCss, atomScript} from 'components/atoms/interactiveAtom';
import { Design } from '@guardian/types/Format';
import Blockquote from 'components/blockquote';
import { isElement, pipe, pipe2 } from 'lib';
import { AudioAtom, QuizAtom, ChartAtom, ExplainerAtom, GuideAtom, ProfileAtom, QandaAtom, TimelineAtom } from '@guardian/atoms-rendering';
import LiveEventLink from 'components/liveEventLink';
import CalloutForm from 'components/calloutForm';
import { fromUnsafe, Result, toOption } from '@guardian/types/result';
import Bullet from 'components/bullet';
import Pullquote  from 'components/pullquote';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import Credit from 'components/credit';
import HorizontalRule from 'components/horizontalRule';


// ----- Renderer ----- //

const getAttrs = (node: Node): Option<NamedNodeMap> =>
    isElement(node) ? some(node.attributes) : none;


const transformHref = (href: string): string => {
    if (href.startsWith('profile/')) {
        return `https://www.theguardian.com/${href}`;
    }

    const url: Result<string, URL> = fromUnsafe(() => new URL(href), 'invalid url');

    return pipe2(
        toOption(url),
        map(url => {
            const path = url.pathname.split('/');
            const isLatest = url.hostname === 'www.theguardian.com' && path[path.length - 1] === 'latest';

            if (isLatest) {
                return href.slice(0, -7);
            }

            return href;
        }),
        withDefault(href)
    )
}

const getHref = (node: Node): Option<string> =>
    pipe(
        getAttrs(node),
        andThen(attrs => pipe2(
            attrs.getNamedItem('href'),
            fromNullable,
            map(attr => transformHref(attr.value)),
        )),
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
    margin: ${remSpace[2]} 0;
    padding-left: 0;
    clear: both;
`;

const listItemStyles = (format: Format): SerializedStyles[] => {
    const baseStyles = css`
        padding-left: ${remSpace[6]};
        padding-bottom: .375rem;

        &::before {
            display: inline-block;
            content: '';
            border-radius: .5rem;
            height: 1rem;
            width: 1rem;
            margin-right: ${remSpace[2]};
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
    `

    const liveblogStyles = css`
        ${darkModeCss`
            &::before {
                background-color: ${neutral[86]};
            }
        `}
    `

    switch (format.design) {
        case (Design.Media):
            return [baseStyles, mediaStyles];
        case (Design.Live):
            return [baseStyles, liveblogStyles];
        default:
            return [baseStyles];
    }
}

const HeadingTwoStyles = (format: Format): SerializedStyles => {
    const font = format.design === Design.AdvertisementFeature
        ? textSans.large({ fontWeight: 'bold' })
        : headline.xxsmall({ fontWeight: 'bold' })

    return css`
        ${font}
        margin: ${remSpace[4]} 0 4px 0;

        & + p {
            margin-top: 0;
        }
    `;
}

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
            return h('a', { href: withDefault('')(getHref(node)), key }, children);
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
}

const textElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(textElement(format));
    switch (node.nodeName) {
        case 'P':
            return h(Paragraph, { key, format }, children);
        case '#text':
            return transform(text, format);
        case 'SPAN':
            return text;
        case 'A':
            return h(Anchor, {
                href: withDefault('')(getHref(node)),
                format,
                key,
            }, transform(text, format));
        case 'H2':
            return (text.includes('* * *'))
                ? h(HorizontalRule, null, null)
                : styledH('h2', { css: HeadingTwoStyles(format), key }, children );
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
    if (format.design === Design.AdvertisementFeature) {
        return palette.labs[300];
    }

    const { kicker, inverted } = getThemeStyles(format.theme);
    return format.design === Design.Media ? inverted : kicker
}

const standfirstTextElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const children = Array.from(node.childNodes).map(standfirstTextElement(format));
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
            const styles = css` color: ${colour}; text-decoration: none;`;
            const url = withDefault('')(getHref(node));
            const href = url.startsWith('profile/') ? `https://www.theguardian.com/${url}` : url
            return styledH('a', { key, href, css: styles }, children);
        }
        default:
            return textElement(format)(node, key);
    }
};

const text = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(textElement(format));

const standfirstText = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(standfirstTextElement(format));

const richLinkWidth = '8.75rem';

const richLinkStyles = (format: Format): SerializedStyles => {
    const backgroundColor = format.design === Design.Comment ? neutral[86] : neutral[97];
    const formatStyles = format.design === Design.Live
        ? `width: calc(100% - ${remSpace[4]});`
        : `
            width: ${richLinkWidth};
            ${from.wide} {
                margin-left: calc(-${richLinkWidth} - ${basePx(2)} - ${basePx(3)});
            }
        `

    return css`
        background: ${backgroundColor};
        padding: ${basePx(1)};
        border-top: solid 1px ${neutral[60]};

        button {
            background: none;
            border: none;
            ${textSans.medium()};
            padding: 0;
            margin: 0;
            display: inline-flex;
        }
        svg{
            width: 1.0625rem;
            border-radius: 100%;
            border: solid 1px ${neutral[7]};
            padding: 4px;
            display: inline-block;
            margin-right: ${remSpace[2]};
        }
        a {
            display:inline-block;
            text-decoration: none;
            color: ${neutral[7]};

            h1 {
                margin: ${basePx(0, 0, 2, 0)};
                ${headline.xxxsmall({ fontWeight: 'bold' })}
                hyphens: auto;
            }
        }

        float: left;
        clear: left;
        margin: ${basePx(1, 2, 1, 0)};

        ${formatStyles}

        ${darkModeCss`
            background-color: ${neutral[20]};
            svg {
                border-color: ${neutral[60]};
                fill: ${neutral[60]};
            }

            a, h1, button {
                color: ${neutral[60]};
            }
        `}
    `;
}

const RichLink = (props: { url: string; linkText: string; format: Format }): ReactElement =>
    styledH('aside', { css: richLinkStyles(props.format) },
        styledH('a', { href: props.url }, [h('h1', null, props.linkText), h('button', null, [h(SvgArrowRightStraight), 'Read more'])])
    );

const Interactive = (props: { url: string; title?: string }): ReactElement => {
    const styles = css`
        margin: ${remSpace[4]} 0;
        ${darkModeCss`
            padding: ${remSpace[4]};
            background: ${neutral[100]}
        `}
    `
    return styledH('figure', { css: styles, className: 'interactive' },
        h('iframe', { src: props.url, height: 500, title: props.title ?? "" }, null)
    );
}

const Tweet = (props: { content: NodeList; format: Format; key: number }): ReactElement =>
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

const captionElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(captionElement(format));
    switch (node.nodeName) {
        case 'STRONG':
            return (format.design === Design.Media)
                ? h('h2', { css: captionHeadingStyles, key }, children)
                : children
        case 'BR':
            return null;
        case 'EM':
            return h('em', { css: css`${textSans.xsmall({ fontStyle: 'italic', fontWeight: 'bold'})}`, key }, children);
        case 'A':
            return h(Anchor, {
                href: withDefault('')(getHref(node)),
                className: format.design === Design.Media ? css`color: ${neutral[86]};` : undefined,
                format,
            }, children);
        case '#text':
            return h('span', null, text);
        default:
            return textElement(format)(node, key);
    }
}

const renderCaption = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(captionElement(format));

const render = (format: Format, excludeStyles = false) =>
    (element: BodyElement, key: number): ReactNode => {
        switch (element.kind) {

            case ElementKind.Text:
                return excludeStyles
                    ? Array.from(element.doc.childNodes).map(plainTextElement)
                    : text(element.doc, format)

            case ElementKind.Image: {
                const { caption, credit, nativeCaption } = element;

                return h(BodyImage, {
                    caption: map<DocumentFragment, ReactNode>(cap =>
                        [
                            renderCaption(cap, format),
                            h(Credit, { credit, format }),
                        ],
                    )(caption),
                    format,
                    supportsDarkMode: true,
                    lightbox: some({
                        className: 'js-launch-slideshow',
                        caption: nativeCaption,
                        credit,
                    }),
                    image: element,
                    leftColumnBreakpoint: some<Breakpoint>('wide'),
                });
            }

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
                return h(Interactive, { url: element.url, key, title: element.alt });

            case ElementKind.Tweet:
                return h(Tweet, { content: element.content, format, key });

            case ElementKind.Audio:
                return h(Audio, { src: element.src, width: element.width, height: element.height });

            case ElementKind.Video:
                return h(Video, { src: element.src, width: element.width, height: element.height })

            case ElementKind.Callout: {
                const { campaign, description } = element;
                return h(CalloutForm, { campaign, format, description });
            }

            case ElementKind.Embed: {
                const props = {
                    dangerouslySetInnerHTML: {
                        __html: element.html,
                    },
                };

                const figureCss = css`
                margin: ${remSpace[4]} 0;
                ${darkModeCss`
                    background: white;
                    padding: ${remSpace[2]};
                `}
            `;
                const captionStyles = css`
                ${textSans.xsmall()}
                color: ${textColour.supporting};
            `

                const figure = (alt: string | null): ReactElement => {
                    const children = [h('div', props), styledH('figcaption', { css: captionStyles }, alt)];
                    return styledH('figure', { css: figureCss }, children);
                }

                return pipe2(
                    element.alt,
                    map(alt => figure(alt)),
                    withDefault(figure(null)),
                );
            }

            case ElementKind.Instagram: {
                const props = {
                    dangerouslySetInnerHTML: {
                        __html: element.html,
                    },
                };

                return h('div', props);
            }

            case ElementKind.ExplainerAtom: {
                return h(ExplainerAtom, { ...element })
            }

            case ElementKind.GuideAtom: {
                return h(GuideAtom, {
                    ...element,
                    pillar: themeToPillar(format.theme),
                    likeHandler: () => { console.log("like clicked"); },
                    dislikeHandler: () => { console.log("dislike clicked"); },
                    expandCallback: () => { console.log("expand clicked"); }
                })
            }

            case ElementKind.QandaAtom: {
                return h(QandaAtom, {
                    ...element,
                    pillar: themeToPillar(format.theme),
                    likeHandler: () => { console.log("like clicked"); },
                    dislikeHandler: () => { console.log("dislike clicked"); },
                    expandCallback: () => { console.log("expand clicked"); }
                })
            }

            case ElementKind.ProfileAtom: {
                return h(ProfileAtom, {
                    ...element,
                    pillar: themeToPillar(format.theme),
                    likeHandler: () => { console.log("like clicked"); },
                    dislikeHandler: () => { console.log("dislike clicked"); },
                    expandCallback: () => { console.log("expand clicked"); }
                })
            }

            case ElementKind.TimelineAtom: {
                return h(TimelineAtom, {
                    ...element,
                    pillar: themeToPillar(format.theme),
                    likeHandler: () => { console.log("like clicked"); },
                    dislikeHandler: () => { console.log("dislike clicked"); },
                    expandCallback: () => { console.log("expand clicked"); }
                })
            }

            case ElementKind.ChartAtom: {
                return h(ChartAtom, { ...element })
            }

            case ElementKind.InteractiveAtom: {
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
            }

            case ElementKind.MediaAtom: {
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
            `

                const figureAttributes = {
                    css: css`margin: ${remSpace[4]} 0;`
                }

                const attributes = {
                    'data-posterUrl': posterUrl,
                    'data-videoId': videoId,
                    'data-duration': duration,
                    'className': 'native-video',
                    css: styles
                }
                const figcaption = h(FigCaption, {
                    format,
                    supportsDarkMode: true,
                    children: map((cap: DocumentFragment) => renderCaption(cap, format))(caption),
                });
                return styledH('figure', figureAttributes, [ styledH('div', attributes), figcaption ]);
            }

            case ElementKind.AudioAtom: {
                const { theme } = format;
                const pillar = themeFromString('pillar/' + themeToPillar(theme));
                const audioAtomStyles = css`
                    figure {
                        margin: 0;
                    }
                `;
                return styledH('div', { ...element, pillar, className: 'js-audio-atom', css: audioAtomStyles }, h(AudioAtom, { ...element, pillar }))
            }

            case ElementKind.QuizAtom: {
                const props = JSON.stringify(element);
                const hydrationParams = h('script', { className: 'js-quiz-params', type: 'application/json' }, props);
                return h('div', { className: 'js-quiz' }, [hydrationParams, h(QuizAtom, { ...element })]);
            }
        }
    };

const renderAll = (format: Format, elements: BodyElement[]): ReactNode[] =>
    elements.map(render(format));

const renderAllWithoutStyles = (format: Format, elements: BodyElement[]): ReactNode[] =>
    elements.map(render(format, true));


// ----- Exports ----- //

export {
    renderAll,
    renderAllWithoutStyles,
    text as renderText,
    textElement as renderTextElement,
    standfirstText as renderStandfirstText,
    getHref,
    transformHref,
    plainTextElement,
    renderCaption,
};
