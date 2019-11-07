// ----- Imports ----- //

import React from 'react';
import jsdom from 'jsdom';

import { Result, Err, fromUnsafe } from './types/Result';
import { imageBlock } from './components/blocks/image';
import { insertAdPlaceholders } from './ads';
import { transform } from 'utils/contentTransformations';

// ----- Setup ----- //

type ReactNode = React.ReactNode;
type ParsedReact = { 
    errors: string[];
    nodes: ReactNode[];
};

type Rendered = { 
    errors: string[];
    html: ReactNode;
};

const { JSDOM } = jsdom;
const h = React.createElement;


// ----- Functions ----- //

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

function getAttrs(node: Node): {} {
    if (isElement(node)) {
        return Array.from(node.attributes).reduce((attrs, attr) => {
            return { ...attrs, [attr.name]: attr.value };
        }, {});
    } else {
        return {};
    }
}

function textElement(node: Node): ReactNode {

    switch (node.nodeName) {
        case 'P':
            return h(
                'p',
                null,
                ...Array.from(node.childNodes).map(textElement),
            );
        case '#text':
            return node.textContent;
        case 'A':
            return h('a', getAttrs(node), node.textContent);
        case 'SPAN':
            return h('span', getAttrs(node), node.textContent);
        case 'BLOCKQUOTE':
            return h(
                'blockquote',
                getAttrs(node),
                ...Array.from(node.childNodes).map(textElement)
            );
        default:
            // Fallback to handle any element
            return h(
                node.nodeName.toLocaleLowerCase(),
                null,
                ...Array.from(node.childNodes).map(textElement),
            );
    }

}

function textBlock(fragment: DocumentFragment): ReactNode[] {
    return Array.from(fragment.children).map(textElement);
}

const pullquoteBlock = (fragment: DocumentFragment): ReactNode =>
    h('aside', null,
        h('blockquote', null,
            h('p', null, fragment.textContent)
        )
    );

const richLinkBlock = (url: string, linkText: string): ReactNode =>
    h('aside', { className: 'rich-link' },
        h('h1', null, linkText),
        h('a', { href: url }, 'Read more'),
    );

const interactiveBlock = (url: string): ReactNode =>
    h('figure', { className: "interactive" },
        h('iframe', { src: url, height: 500 }, null)
    )

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
function reactFromElement(element: any, imageSalt: string): Result<string, ReactNode> {

    switch (element.type) {
        case 'text':
            return fromUnsafe(
                () => JSDOM.fragment(transform(element.textTypeData.html)),
                'Failed to parse text element',
            ).map(textBlock);

        case 'tweet':
            return fromUnsafe(
                () => JSDOM.fragment(element.tweetTypeData.html),
                'Failed to parse text element',
            ).map(textBlock);

        case 'pullquote':

            return fromUnsafe(
                () => JSDOM.fragment(element.pullquoteTypeData.html),
                'Failed to parse pullquote element',
            ).map(pullquoteBlock);

        case 'rich-link':

            return fromUnsafe(() => {
                const { url, linkText } = element.richLinkTypeData;
                return richLinkBlock(url, linkText);
            }, 'Failed to parse rich link');

        case 'image':

            return fromUnsafe(() => {
                const { imageTypeData, assets } = element;
                return imageBlock(imageTypeData, assets, imageSalt)
            }, 'Failed to parse image');

        case 'interactive':

            return fromUnsafe(() => {
                const { interactiveTypeData } = element;
                return interactiveBlock(interactiveTypeData.iframeUrl)
            }, 'Failed to parse interactive');

        default:
            return new Err(`Unexpected element type: ${element.type}`);
    }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
function elementsToReact(elements: any, imageSalt: string): ParsedReact {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    const elementToReact = ({ errors, nodes }: ParsedReact, element: any): ParsedReact =>
        reactFromElement(element, imageSalt).either(
            error => ({ errors: [ ...errors, error ], nodes }),
            node => ({ errors, nodes: [ ...nodes, node ] }),
        );

    return elements.reduce(elementToReact, { errors: [], nodes: [] });

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(bodyElements: any, imageSalt: string, ads = true): Rendered {
    const reactNodes = elementsToReact(bodyElements, imageSalt);
    const reactNodesWithAds = ads ? insertAdPlaceholders(reactNodes.nodes) : reactNodes.nodes;
    const main = h('article', null, ...reactNodesWithAds);

    return {
        errors: reactNodes.errors,
        html: main,
    };

}


// ----- Exports ----- //

export {
    render,
};
