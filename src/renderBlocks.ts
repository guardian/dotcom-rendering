// ----- Imports ----- //

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsdom from 'jsdom';

import { Result, Ok, Err } from './types/Result';
import { imageBlock } from './components/blocks/image';


// ----- Setup ----- //

type ReactNode = React.ReactNode;
type ParsedReact = { errors: string[], nodes: ReactNode[] };
type Rendered = { errors: string[], html: string };

const { JSDOM } = jsdom;
const h = React.createElement;


// ----- Functions ----- //

function getAttrs(node: Element) {
    return Array.from(node.attributes).reduce((attrs, attr) => {
        return { ...attrs, [attr.name]: attr.value };
    }, {});
}

function textElement(node: Element): ReactNode {

    switch (node.nodeName) {
        case 'P':
            return h('p', null, Array.from(node.childNodes).map(textElement));
        case '#text':
            return node.textContent;
        case 'A':
            return h('a', getAttrs(node), node.textContent);
        default:
            // Fallback to handle any element
            return h(
                node.nodeName.toLocaleLowerCase(),
                null,
                Array.from(node.childNodes).map(textElement),
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
    h('aside', null, [
        h('h1', null, linkText),
        h('a', { href: url }, 'Read more'),
    ]);

function reactFromElement(element: any): Result<string, ReactNode> {

    switch (element.type) {
        case 'text':
            try {
                const fragment = new Ok<string, DocumentFragment>(JSDOM.fragment(element.textTypeData.html));
                return fragment.map(textBlock);
            } catch (_) {
                return new Err('Failed to parse text element');
            }
        case 'pullquote':
            try {
                const fragment = new Ok<string, DocumentFragment>(JSDOM.fragment(element.pullquoteTypeData.html));
                return fragment.map(pullquoteBlock);
            } catch (_) {
                return new Err('Failed to parse pullquote element');
            }
        case 'rich-link':
            try {
                const { url, linkText } = element.richLinkTypeData;
                return new Ok(richLinkBlock(url, linkText));
            } catch (_) {
                return new Err('Failed to parse rich link');
            }
        case 'image':
            try {
                const { imageTypeData, assets } = element;
                return new Ok(imageBlock(imageTypeData, assets));
            } catch (_) {
                return new Err('Failed to parse image');
            }
        default:
            return new Err(`Unexpected element type: ${element.type}`);
    }

}

function elementsToReact(elements: any[]): ParsedReact {

    const elementToReact = ({ errors, nodes }: ParsedReact, element: any): ParsedReact =>
        reactFromElement(element).either(
            error => ({ errors: [ ...errors, error ], nodes }),
            node => ({ errors, nodes: [ ...nodes, node ] }),
        );

    return elements.reduce(elementToReact, { errors: [], nodes: [] });

}

function parseCapi(capiResponse: string): Result<string, any> {
    try {
        return new Ok(JSON.parse(capiResponse));
    } catch (_) {
        return new Err('Could not parse the CAPI response');
    }
}

function getElements(capi: any): Result<string, any> {
    try {
        return capi.response.content.blocks.body[0].elements;
    } catch (_) {
        return new Err('Unexpected CAPI response structure');
    }
}

function render(capiResponse: string): Result<string, Rendered> {

    return parseCapi(capiResponse)
        .andThen(getElements)
        .map(elements => {

            const reactNodes = elementsToReact(elements);
            const main = h('article', null, reactNodes.nodes);

            return {
                errors: reactNodes.errors,
                html: ReactDOMServer.renderToString(main),
            };
    
    });

}


// ----- Exports ----- //

export {
    render,
};
