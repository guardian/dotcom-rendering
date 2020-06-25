// ----- Imports ----- //

import { ReactNode, createElement as h, ReactElement, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { text as textColour, neutral } from '@guardian/src-foundations/palette';
import { Option, fromNullable, some, none, andThen, map, withDefault } from 'types/option';
import { basePx, icons, darkModeCss, pageFonts } from 'styles';
import { getPillarStyles } from 'pillarStyles';
import { Format } from 'format';
import { ElementKind, BodyElement } from 'bodyElement';
import { Role, BodyImageProps } from 'image';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import Audio from 'components/audio';
import Video from 'components/video';
import Paragraph from 'components/paragraph';
import BodyImage from 'components/bodyImage';
import BodyImageThumbnail from 'components/bodyImageThumbnail';
import FigCaption from 'components/figCaption';
import BodyImageHalfWidth from 'components/bodyImageHalfWidth';
import Anchor from 'components/anchor';
import InteractiveAtom from 'components/atoms/interactiveAtom';
import { Design } from '@guardian/types/Format';
import Blockquote from 'components/blockquote';
import { isElement, pipe2, pipe } from 'lib';
import { ExplainerAtom } from '@guardian/atoms-rendering';
import LiveEventLink from 'components/liveEventLink';


// ----- Renderer ----- //

const getAttrs = (node: Node): Option<NamedNodeMap> =>
    isElement(node) ? some(node.attributes) : none;

const getAttr = (attr: string) => (node: Node): Option<string> =>
    pipe(
        getAttrs(node),
        andThen(attrs => pipe2(
            attrs.getNamedItem(attr),
            fromNullable,
            map(attr => attr.value),
        )),
    );

const getHref: (node: Node) => Option<string> =
    getAttr('href');

const bulletStyles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);
    return css`
        color: transparent;
        display: inline-block;

        &::before {
            content: '';
            background-color: ${kicker};
            width: 1rem;
            height: 1rem;
            border-radius: .5rem;
            display: inline-block;
            vertical-align: middle;
            ${darkModeCss`
                background-color: ${inverted};
            `}
        }
    `;
}

interface BulletProps {
    format: Format;
    text: string;
}

const Bullet: FC<BulletProps> = ({ format, text }: BulletProps): ReactElement =>
    styledH('p', { css: css`display: inline; ${body.medium({ lineHeight: 'loose' })} overflow-wrap: break-word; margin: 0 0 ${remSpace[3]};` },
        styledH('span', { css: bulletStyles(format) }, '•'),
        text.replace(/•/g, '')
    );

const HorizontalRuleStyles = css`
    display: block;
    width: 8.75rem;
    height: 0.125rem;
    margin: 0;
    border: 0;
    margin-top: 3rem;
    margin-bottom: 0.1875rem;
    background-color: ${neutral[93]};
    ${darkModeCss`
        background-color: ${neutral[20]};
    `}
`;

const HorizontalRule = (): ReactElement =>
    styledH('hr', { css: HorizontalRuleStyles }, null);


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

const listItemStyles = (format: Format): SerializedStyles => {
    const backgroundColour = format.design === Design.Media
        ? neutral[46] : neutral[86];
    return css`
        padding-left: ${remSpace[6]};
        padding-bottom: .375rem;

        &::before {
            display: inline-block;
            content: '';
            border-radius: .5rem;
            height: 1rem;
            width: 1rem;
            margin-right: ${remSpace[2]};
            background-color: ${backgroundColour};
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

const standfirstTextElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const children = Array.from(node.childNodes).map(standfirstTextElement(format));
    const { kicker, inverted } = getPillarStyles(format.pillar);
    switch (node.nodeName) {
        case 'P':
            return h('p', { key }, children);
        case 'UL':
            return styledH('ul', { css: listStyles }, children);
        case 'LI':
            return styledH('li', { css: listItemStyles(format) }, children);
        case 'A': {
            const colour = format.design === Design.Media ? inverted : kicker;
            const styles = css` color: ${colour}; text-decoration: none`;
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

const pullquoteStyles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);
    return css`
        color: ${kicker};
        margin: 0;
        ${headline.xsmall({ fontWeight: 'light' })};
        ${darkModeCss`color: ${inverted};`}

        blockquote {
            margin-left: 0;
        }

        p {
            margin: ${remSpace[4]} 0 ${remSpace[2]} 0;

            &::before {
                ${icons}
                font-size: 1.5rem;
                line-height: 1.2;
                font-weight: 300;
                content: '\\e11c';
                display: inline-block;
                margin-right: ${basePx(1)};
            }
        }

        footer {
            font-size: 1.8rem;
            margin-top: 4px;

            cite {
                font-style: normal;
            }
        }
    `;
}

type PullquoteProps = {
    quote: string;
    format: Format;
    attribution: Option<string>;
};


const Pullquote: FC<PullquoteProps> = ({ quote, attribution, format }: PullquoteProps) => {
    const children = pipe2(
        attribution,
        map(attribution => ([h('p', null, quote), h('cite', null, attribution)])),
        withDefault([h('p', null, quote)]),
    );

    return styledH('aside',
        { css: pullquoteStyles(format) },
        h('blockquote', null, children)
    );
}

const richLinkWidth = '8.75rem';

const richLinkStyles = (format: Format): SerializedStyles => {
    const formatStyles = format.design === Design.Live
        ? `width: calc(100% - ${remSpace[4]});`
        : `
            width: ${richLinkWidth};
            ${from.wide} {
                margin-left: calc(-${richLinkWidth} - ${basePx(2)} - ${basePx(3)});
            }
        `

    return css`
        background: ${neutral[97]};
        padding: ${basePx(1)};
        border-top: solid 1px ${neutral[60]};

        button {
            background: none;
            border: none;
            ${textSans.medium()};
            padding: 0;
            margin: 0;
        }

        button::before {
            ${icons}
            content: '\\e005';
            border-radius: 100%;
            border: solid 1px ${neutral[7]};
            font-size: 12px;
            padding: 3px 6px 4px 6px;
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
            button::before {
                border-color: ${neutral[60]};
            }

            a, h1, button {
                color: ${neutral[60]};
            }
        `}
    `;
}

const RichLink = (props: { url: string; linkText: string; format: Format }): ReactElement =>
    styledH('aside', { css: richLinkStyles(props.format) },
        styledH('a', { href: props.url }, [h('h1', null, props.linkText), h('button', null, 'Read more')])
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

const imageComponentFromRole = (role: Role): FC<BodyImageProps> => {
    if (role === Role.Thumbnail) {
        return BodyImageThumbnail;
    } else if (role === Role.HalfWidth) {
        return BodyImageHalfWidth;
    } else {
        return BodyImage;
    }
}

const render = (format: Format, excludeStyles = false) =>
    (element: BodyElement, key: number): ReactNode => {
    switch (element.kind) {

        case ElementKind.Text:
            return excludeStyles
                ? Array.from(element.doc.childNodes).map(plainTextElement)
                : text(element.doc, format)

        case ElementKind.Image: {
            const { caption, credit, role } = element;
            const ImageComponent = pipe2(
                role,
                map(imageComponentFromRole),
                withDefault(BodyImage),
            );

            const figcaption = withDefault(Role.Thumbnail)(role) !== Role.HalfWidth
                ? h(FigCaption, { format, caption, credit })
                : null;

            return h(ImageComponent, { image: element, format }, figcaption);
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

        case ElementKind.Embed: {
            const props = {
                dangerouslySetInnerHTML: {
                  __html: element.html,
                },
            };

            const figureCss = css`
                margin ${remSpace[4]} 0;
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

        case ElementKind.InteractiveAtom: {
            const { html, css: styles, js } = element;
            if (format.design !== Design.Interactive) {
                const fenced = `
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                            <style>
                                ${pageFonts}
                                ${styles}
                                body {
                                    background: white !important;
                                    padding: ${remSpace[2]} !important;
                                }
                            </style>
                        </head>
                        <body>
                            ${html}
                            <script>
                                ${withDefault('')(js)}
                                function resize() {
                                    window.frameElement.height = document.body.offsetHeight;
                                }
                                window.addEventListener('resize', resize);
                                resize();
                            </script>
                        </body>
                    </html>
                `;
                return h('iframe', { srcdoc: fenced });
            } else {
                return h(InteractiveAtom, { html, styles, js, format });
            }
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
};
