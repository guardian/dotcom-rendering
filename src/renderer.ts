// ----- Imports ----- //

import { ReactNode, createElement as h, ReactElement } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { Option, fromNullable, Some, None } from 'types/option';
import { basePx, icons, darkModeCss } from 'styles';
import { getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { ElementKind, BodyElement } from 'item';
import { Role } from 'image';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { ImageMappings } from 'components/shared/page';
import Audio from 'components/audio';
import Video from 'components/video';
import Paragraph from 'components/paragraph';
import BodyImage from 'components/bodyImage';
import BodyImageThumbnail from 'components/bodyImageThumbnail';
import FigCaption from 'components/figCaption';
import MediaFigCaption from 'components/media/mediaFigCaption';


// ----- Renderer ----- //

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const getAttrs = (node: Node): Option<NamedNodeMap> =>
    isElement(node) ? new Some(node.attributes) : new None();

const getAttr = (attr: string) => (node: Node): Option<string> =>
    getAttrs(node).andThen(attrs =>
        fromNullable(attrs.getNamedItem(attr)).fmap(attr => attr.value)
    );

const getHref: (node: Node) => Option<string> =
    getAttr('href');

const bulletStyles = (colour: string): SerializedStyles => css`
    color: transparent;
    display: inline-block;

    &::before {
        content: '';
        background-color: ${colour};
        width: 1rem;
        height: 1rem;
        border-radius: .5rem;
        display: inline-block;
        vertical-align: middle;
    }
`;

const Bullet = (props: { pillar: Pillar; text: string }): ReactElement =>
    styledH('p', { css: css`display: inline; ${body.medium({ lineHeight: 'loose' })} overflow-wrap: break-word; margin: 0 0 ${remSpace[3]};` },
        styledH('span', { css: bulletStyles(getPillarStyles(props.pillar).kicker) }, '•'),
        props.text.replace(/•/g, ''),
        null
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
`;

const HorizontalRule = (): ReactElement =>
    styledH('hr', { css: HorizontalRuleStyles }, null);


const transform = (text: string, pillar: Pillar): ReactElement | string => {
    if (text.includes('•')) {
        return h(Bullet, { pillar, text });
    } else if (text.includes('* * *')) {
        return h(HorizontalRule, null, null);
    }
    return text;
};

const anchorStyles = (colour: string): SerializedStyles => css`
    color: ${colour};
    text-decoration: none;
    border-bottom: 0.0625rem solid ${neutral[86]};

    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const Anchor = (props: { href: string; text: string; pillar: Pillar }): ReactElement =>
    styledH(
        'a',
        { css: anchorStyles(getPillarStyles(props.pillar).kicker), href: props.href },
        transform(props.text, props.pillar),
    );

const listStyles: SerializedStyles = css`
    list-style: none;
    margin: ${remSpace[2]} 0;
    padding-left: 0;
`;

const listItemStyles: SerializedStyles = css`
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
            background-color: ${neutral[60]};
        }
    `}
`;

const HeadingTwoStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin: ${remSpace[4]} 0 4px 0;

    & + p {
        margin-top: 0;
    }
`;

const TweetStyles = css`
    ${until.wide} {
        clear: both;
    }
`;

const textElement = (pillar: Pillar) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(textElement(pillar));
    switch (node.nodeName) {
        case 'P':
            return h(Paragraph, { key }, children);
        case '#text':
            return transform(text, pillar);
        case 'SPAN':
            return text;
        case 'A':
            return h(Anchor, { href: getHref(node).withDefault(''), text, pillar, key }, children);
        case 'H2':
            return styledH('h2', { css: HeadingTwoStyles, key }, children );
        case 'BLOCKQUOTE':
            return h('blockquote', { key }, children);
        case 'STRONG':
            return h('strong', { key }, children);
        case 'EM':
            return h('em', { key }, children);
        case 'BR':
            return h('br', { key }, null);
        case 'UL':
            return styledH('ul', { css: listStyles }, children);
        case 'LI':
            return styledH('li', { css: listItemStyles }, children);
        case 'MARK':
            return styledH('mark', { key }, children);
        default:
            return null;
    }
};

const captionHeadingStyles = css`
    ${headline.xxxsmall()}
    color: ${neutral[86]};
    padding-bottom: ${remSpace[2]};
    padding-top: ${remSpace[2]};
    margin: 0;
    
    em {
        ${textSans.xsmall({ italic: true, fontWeight: 'bold'})}
    }
`;

const MediaCaptionText = (props: { text: string; pillar: Pillar }): ReactElement =>
    styledH(
        'p',
        { css: css`
              ${body.small()}
              color: ${neutral[86]};
              margin: 0;
        ` },
        props.text,
    );

const CaptionItalicStyles = (props: { text: string; pillar: Pillar }): ReactElement =>
    styledH(
        'span',
        { css: css`
              ${textSans.xsmall({ italic: true })}
               ${textSans.xsmall({ fontWeight: 'bold' })}
               color: ${neutral[86]};
        ` },
        props.text,
    );

const captionElement = (pillar: Pillar) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(captionElement(pillar));
    switch (node.nodeName) {
        case 'STRONG':
            return styledH('p', {css: captionHeadingStyles, key}, children);
        case 'BR':
            return null;
        case 'EM':
            return h(CaptionItalicStyles, {text, pillar, key}, children);
        case '#text':
            return h(MediaCaptionText, { text, pillar, key }, children);
        default:
            return textElement(pillar)(node, key);
    }
}

const standfirstTextElement = (pillar: Pillar) => (node: Node, key: number): ReactNode => {
    const children = Array.from(node.childNodes).map(standfirstTextElement(pillar));
    switch (node.nodeName) {
        case 'P':
            return h('p', { key }, children);
        default:
            return textElement(pillar)(node, key);
    }
};

const text = (doc: DocumentFragment, pillar: Pillar): ReactNode[] =>
    Array.from(doc.childNodes).map(textElement(pillar));

const standfirstText = (doc: DocumentFragment, pillar: Pillar): ReactNode[] =>
    Array.from(doc.childNodes).map(standfirstTextElement(pillar));

const pullquoteStyles = (colour: string): SerializedStyles => css`
    color: ${colour};
    margin: 0;
    ${headline.xsmall({ fontWeight: 'light' })};

    blockquote {
        margin-left: 0;
    }

    p {
        margin: 1em 0;

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

type PullquoteProps = {
    quote: string;
    attribution: Option<string>;
    pillar: Pillar;
};

const Pullquote = (props: PullquoteProps): ReactElement =>
    styledH('aside', { css: pullquoteStyles(getPillarStyles(props.pillar).kicker) },
        h('blockquote', null,
            h('p', null, props.quote)
        )
    );

const richLinkWidth = '8.75rem';

const richLinkStyles = css`
    background: ${neutral[97]};
    padding: ${basePx(1)};

    h1 {
        margin: ${basePx(0, 0, 2, 0)};
        font-size: 1rem;
    }

    p {
        margin: ${basePx(1, 0)};
    }

    span {
        display: none;
    }

    a {
        text-decoration: none;
        border-bottom: none;
    }

    float: left;
    clear: left;
    width: ${richLinkWidth};
    margin: ${basePx(1, 2, 1, 0)};

    ${from.wide} {
        margin-left: calc(-${richLinkWidth} - ${basePx(2)} - ${basePx(3)});
    }

    ${darkModeCss`
        background: ${neutral[0]};
        a {
            border-bottom: 0.0625rem solid ${neutral[60]};
        }
    `}
`;

const RichLink = (props: { url: string; linkText: string; pillar: Pillar }): ReactElement =>
    styledH('aside', { css: richLinkStyles },
        h('h1', null, props.linkText),
        h(Anchor, { href: props.url, pillar: props.pillar, text: 'Read more' }),
    );

const Interactive = (props: { url: string; title?: string }): ReactElement =>
    styledH('figure', { className: 'interactive' },
        h('iframe', { src: props.url, height: 500, title: props.title ?? "" }, null)
    );

const Tweet = (props: { content: NodeList; pillar: Pillar; key: number }): ReactElement => {
    // twitter script relies on twitter-tweet class being present
    return styledH('blockquote', { key: props.key, className: 'twitter-tweet', css: TweetStyles }, ...Array.from(props.content).map(textElement(props.pillar)));
};

const render = (pillar: Pillar, imageMappings: ImageMappings) =>
    (element: BodyElement, key: number): ReactNode => {
    switch (element.kind) {

        case ElementKind.Text:
            return text(element.doc, pillar);

        case ElementKind.Image: {
            const { caption, credit, role } = element;
            const ImageComponent = role
                .fmap(imageRole => imageRole === Role.Thumbnail ? BodyImageThumbnail : BodyImage)
                .withDefault(BodyImage);

            const figcaption = caption.fmap<ReactNode>(c =>
                h(FigCaption, { pillar, text: text(c, pillar), credit })
            ).withDefault(null);
            
            return h(ImageComponent, { image: element, imageMappings }, figcaption);
        }

        case ElementKind.Pullquote: {
            const { quote, attribution } = element;

            return h(Pullquote, { quote, attribution, pillar, key });
        }

        case ElementKind.RichLink: {
            const { url, linkText } = element;

            return h(RichLink, { url, linkText, pillar, key });
        }

        case ElementKind.Interactive:
            return h(Interactive, { url: element.url, key, title: element.alt });

        case ElementKind.Tweet:
            return h(Tweet, { content: element.content, pillar, key });

        case ElementKind.Audio:
            return h(Audio, { src: element.src, width: element.width, height: element.height });

        case ElementKind.Video:
            return h(Video, { src: element.src, width: element.width, height: element.height })

        case ElementKind.Embed:
        case ElementKind.Instagram: {
            const props = {
                dangerouslySetInnerHTML: {
                  __html: element.html,
                },
            };

            return h('div', props);
        }
    }
};

const renderAll = (imageMappings: ImageMappings) =>
    (pillar: Pillar, elements: BodyElement[]): ReactNode[] =>
        elements.map(render(pillar, imageMappings));

const renderCaption = (doc: DocumentFragment, pillar: Pillar): ReactNode[] =>
    Array.from(doc.childNodes).map(captionElement(pillar));

const renderMedia = (imageMappings: ImageMappings) =>
    (pillar: Pillar, elements: BodyElement[]): ReactNode[] =>
        elements.map((element) => {

            if (element.kind === ElementKind.Image) {
                const { caption, credit } = element;

                const figcaption = caption.fmap<ReactNode>(c => 
                    h(MediaFigCaption, { text: renderCaption(c, pillar), credit })
                ).withDefault(null);

                return h(BodyImage, {
                    image: element,
                    imageMappings,
                }, figcaption);

            }

            return null;

        });

// ----- Exports ----- //

export {
    renderAll,
    text as renderText,
    standfirstText as renderStandfirstText,
    getHref,
    renderMedia
};
