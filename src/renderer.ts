// ----- Imports ----- //

import { ReactNode, createElement as h, Fragment, ReactElement } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';

import { ElementType } from 'capiThriftModels';
import { Option, fromNullable, Some, None } from 'types/option';
import { srcset, transformUrl } from 'asset';
import { basePx, icons, headlineFont, darkModeCss, textSans } from 'styles';
import { getPillarStyles, Pillar } from 'pillar';
import { imageRatioStyles } from 'components/blocks/image';
import { Block } from 'article';


// ----- Renderer ----- //

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const getAttrs = (node: Node): Option<NamedNodeMap> =>
    isElement(node) ? new Some(node.attributes) : new None();

const getAttr = (attr: string) => (node: Node): Option<string> =>
    getAttrs(node).andThen(attrs =>
        fromNullable(attrs.getNamedItem(attr)).map(attr => attr.value)
    );

const getHref: (node: Node) => Option<string> =
    getAttr('href');

const Paragraph = (props: { children?: ReactNode }): ReactElement =>
    h('p', null, props.children);

const anchorStyles = (colour: string): SerializedStyles => css`
    color: ${colour};
    text-decoration: none;
    padding-bottom: 0.15em;
    background-image: linear-gradient(${colour}66 0%, ${colour}66 100%);
    background-repeat: repeat-x;
    background-size: 1px 1px;
    background-position: 0 bottom;
`;

const Anchor = (props: { href: string; text: string; pillar: Pillar }): ReactElement =>
    styledH(
        'a',
        { css: anchorStyles(getPillarStyles(props.pillar).kicker), href: props.href },
        props.text,
    );

const bulletStyles = (colour: string): SerializedStyles => css`
    color: transparent;

    &::before {
        content: '';
        background-color: ${colour};
        width: 1rem;
        height: 1rem;
        border-radius: .5rem;
        display: inline-block;
    }
`;

const HeadingTwoStyles = css`
    font-size: 1.8rem;
    line-height: 2.2rem;
    margin: ${basePx(1, 0)};
    font-weight: 500;

    & + p {
        margin-top: 0;
    }
`

const Bullet = (props: { pillar: Pillar; text: string }): ReactElement =>
    h(Fragment, null,
        styledH('span', { css: bulletStyles(getPillarStyles(props.pillar).kicker) }, '•'),
        props.text.replace(/•/, ''),
    );

const HeadingTwo = (props: { children?: ReactNode }): ReactElement =>
    styledH('h2', { css: HeadingTwoStyles }, props.children );


const textElement = (pillar: Pillar) => (node: Node, key: number): ReactNode => {
    switch (node.nodeName) {
        case 'P':
            return h(Paragraph, { key }, Array.from(node.childNodes).map(textElement(pillar)));
        case '#text':
            const text = node.textContent;
            return text?.includes('•') ? h(Bullet, { pillar, text }) : text;
        case 'SPAN':
            return node.textContent;
        case 'A':
            return h(Anchor, { href: getHref(node).withDefault(''), text: node.textContent ?? '', pillar, key });
        case 'H2':
            return h(HeadingTwo, { key }, Array.from(node.childNodes).map(textElement(pillar)));
        default:
            return null;
    }
}

const text = (doc: DocumentFragment, pillar: Pillar): ReactNode[] =>
    Array.from(doc.childNodes).map(textElement(pillar));

const makeCaption = (caption: string, displayCredit: boolean, credit: string): string =>
    displayCredit ? `${caption} ${credit}` : caption;

interface ImageProps {
    url: string;
    alt: string;
    salt: string;
    caption: string;
    displayCredit: boolean;
    credit: string;
    width: number;
    height: number;
}

const imageStyles = css`
    margin-left: ${basePx(-1)};
    margin-right: ${basePx(-1)};

    ${from.phablet} {
        margin-left: 0;
        margin-right: 0;
    }

    ${from.wide} {
        margin: 1em 0;
    }

    img {
        width: 100%; 
    }

    figcaption {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: ${palette.neutral[46]};
        ${textSans}

        ${until.phablet} {
            padding-left: ${basePx(1)};
            padding-right: ${basePx(1)};
        }
    }
`;

const Image = (props: ImageProps): ReactElement => {
    const { url, alt, salt, caption, displayCredit, credit, width, height } = props;
    return styledH('figure', { css: imageStyles },
        h('img', {
            css: imageRatioStyles("100vw", width ?? 5, height ?? 3),
            sizes: '100%',
            srcSet: srcset(salt)(url),
            alt,
            src: transformUrl(salt, url, 500),
        }),
        h('figcaption', null, makeCaption(caption, displayCredit, credit)),
    );
}

const pullquoteStyles = (colour: string): SerializedStyles => css`
    font-weight: 200;
    font-size: 2.2rem;
    line-height: 1.3;
    color: ${colour};
    ${headlineFont}
    margin: 0;

    blockquote {
        margin-left: 0;
    }

    p {
        margin: 1em 0;

        &::before {
            ${icons}
            font-size: 2.2rem;
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

const richLinkWidth = '13.75rem';

const richLinkStyles = css`
    background: ${palette.neutral[97]};
    padding: ${basePx(1)};

    h1 {
        margin: 0;
    }

    p {
        margin: ${basePx(1, 0)};
    }

    span {
        display: none;
    }

    a {
        text-decoration: none;
    }

    float: left;
    clear: left;
    width: ${richLinkWidth};
    margin: ${basePx(1, 2, 1, 0)};

    ${from.wide} {
        margin-left: calc(-${richLinkWidth} - 16px - 24px);
    }

    ${darkModeCss`
        border-top: 1px solid ${palette.neutral[60]};
        border-bottom: 1px solid ${palette.neutral[60]};
        a {
            &::before {
                color: ${palette.neutral[60]};
            }
        }
    `}
`;

const RichLink = (props: { url: string; linkText: string; pillar: Pillar }): ReactElement =>
    styledH('aside', { css: richLinkStyles },
        h('h1', null, props.linkText),
        h(Anchor, { href: props.url, pillar: props.pillar, text: 'Read more' }),
    );

const Interactive = (props: { url: string }): ReactElement =>
    h('figure', { className: 'interactive' },
        h('iframe', { src: props.url, height: 500 }, null)
    );

const Tweet = (props: { content: NodeList; pillar: Pillar; key: number }): ReactElement =>
    h('blockquote', { key: props.key }, ...Array.from(props.content).map(textElement(props.pillar)));

const render = (salt: string) => (pillar: Pillar) => (block: Block, key: number): ReactNode => {
    switch (block.kind) {

        case ElementType.TEXT:
            return text(block.doc, pillar);

        case ElementType.IMAGE:
            const { file, alt, caption, displayCredit, credit, width, height } = block;
            return h(Image, {
                url: file,
                alt,
                salt,
                caption,
                displayCredit,
                credit,
                key,
                width,
                height
            });

        case ElementType.PULLQUOTE:
            const { quote, attribution } = block;
            return h(Pullquote, { quote, attribution, pillar, key });

        case ElementType.RICH_LINK:
            const { url, linkText } = block;
            return h(RichLink, { url, linkText, pillar, key });

        case ElementType.INTERACTIVE:
            return h(Interactive, { url: block.url, key });

        case ElementType.TWEET:
            return h(Tweet, { content: block.content, pillar, key });

        default:
            return null;

    }
}

const renderAll = (salt: string) => (pillar: Pillar, blocks: Block[]): ReactNode[] =>
    blocks.map(render(salt)(pillar));


// ----- Exports ----- //

export {
    renderAll,
    text as renderText,
};
