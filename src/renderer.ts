// ----- Imports ----- //

import { ReactNode, createElement as h, ReactElement, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { Option, fromNullable, Some, None } from 'types/option';
import { basePx, icons, darkModeCss } from 'styles';
import { getPillarStyles } from 'pillarStyles';
import { Format } from 'format';
import { ElementKind, BodyElement } from 'bodyElement';
import { Role, BodyImageProps } from 'image';
import { body, headline } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { ImageMappings } from 'components/shared/page';
import Audio from 'components/audio';
import Video from 'components/video';
import Paragraph from 'components/paragraph';
import BodyImage from 'components/bodyImage';
import BodyImageThumbnail from 'components/bodyImageThumbnail';
import FigCaption from 'components/figCaption';
import BodyImageHalfWidth from 'components/bodyImageHalfWidth';
import Anchor from 'components/anchor';


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

interface BulletProps {
    format: Format;
    text: string;
}

const Bullet: FC<BulletProps> = ({ format, text }: BulletProps): ReactElement =>
    styledH('p', { css: css`display: inline; ${body.medium({ lineHeight: 'loose' })} overflow-wrap: break-word; margin: 0 0 ${remSpace[3]};` },
        styledH('span', { css: bulletStyles(getPillarStyles(format.pillar).kicker) }, '•'),
        text.replace(/•/g, ''),
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
                href: getHref(node).withDefault(''),
                format,
                key,
            }, transform(text, format));
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

const standfirstTextElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const children = Array.from(node.childNodes).map(standfirstTextElement(format));
    switch (node.nodeName) {
        case 'P':
            return h('p', { key }, children);
        default:
            return textElement(format)(node, key);
    }
};

const text = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(textElement(format));

const standfirstText = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(standfirstTextElement(format));

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
    format: Format;
};

const Pullquote: FC<PullquoteProps> = ({ quote, format }: PullquoteProps) =>
    styledH('aside',
        { css: pullquoteStyles(getPillarStyles(format.pillar).kicker) },
        h('blockquote', null,
            h('p', null, quote)
        ),
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

const RichLink = (props: { url: string; linkText: string; format: Format }): ReactElement =>
    styledH('aside', { css: richLinkStyles },
        h('h1', null, props.linkText),
        h(Anchor, { href: props.url, format: props.format }, 'Read more'),
    );

const Interactive = (props: { url: string; title?: string }): ReactElement =>
    styledH('figure', { className: 'interactive' },
        h('iframe', { src: props.url, height: 500, title: props.title ?? "" }, null)
    );

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

const render = (format: Format, imageMappings: ImageMappings) =>
    (element: BodyElement, key: number): ReactNode => {
    switch (element.kind) {

        case ElementKind.Text:
            return text(element.doc, format);

        case ElementKind.Image: {
            const { caption, credit, role } = element;
            const ImageComponent = role
                .fmap(imageComponentFromRole)
                .withDefault(BodyImage);

            const figcaption = role.withDefault(Role.Thumbnail) !== Role.HalfWidth
                ? h(FigCaption, { format, caption, credit })
                : null;

            return h(ImageComponent, { image: element, imageMappings }, figcaption);
        }

        case ElementKind.Pullquote:
            return h(Pullquote, { quote: element.quote, format, key });

        case ElementKind.RichLink: {
            const { url, linkText } = element;

            return h(RichLink, { url, linkText, format, key });
        }

        case ElementKind.Interactive:
            return h(Interactive, { url: element.url, key, title: element.alt });

        case ElementKind.Tweet:
            return h(Tweet, { content: element.content, format, key });

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
    (format: Format, elements: BodyElement[]): ReactNode[] =>
        elements.map(render(format, imageMappings));


// ----- Exports ----- //

export {
    renderAll,
    text as renderText,
    textElement as renderTextElement,
    standfirstText as renderStandfirstText,
    getHref,
};
