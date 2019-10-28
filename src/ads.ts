import React from 'react';

const h = React.createElement;

function insertAdPlaceholders(reactNodes: any) {
    // Insert ad placeholders after the following paragraph tags
    const adIndexes = [3, 9];

    const ad = h('div', { className: 'ad-placeholder' }, "this is an advert. buy now.");

    const flattenedNodes = reactNodes
        .flat()
        .map((node: any, index: any) => ({ ...node, index }));

    const paragraphs = flattenedNodes.filter((node: { type: string; }) => node.type == 'p');
    
    paragraphs.forEach((p: { index: number; }, i: number) => {
        adIndexes.forEach((adIndex, idx) => {
            if (i === adIndex) {
                flattenedNodes.splice(p.index + idx, 0, ad);
            }
        })
    });

    return flattenedNodes;
}

export { insertAdPlaceholders }
