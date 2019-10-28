import React from 'react';

const h = React.createElement;

function insertAdPlaceholders(reactNodes: React.ReactNode[]): React.ReactNode[] {
    // Insert ad placeholders after the following paragraph tags
    const adIndexes = [3, 9];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenedNodes: any = reactNodes
        .flat()
        .map((node: { type: string }, index: number) => ({ ...node, index }));

    const paragraphs = flattenedNodes.filter((node: { type: string }) => node.type === 'p');
    const className = paragraphs.length < 15 ? 'ad-placeholder short' : 'ad-placeholder';

    const ad = h('div', { className  },
        h('div', { className: 'ad-labels' },
            h('span', null, 'Advertisement'),
            h('span', { className: 'ad-hide' }, 'Hide')
        )
    );
    
    paragraphs.forEach((p: { index: number }, i: number) => {
        adIndexes.forEach((adIndex, idx) => {
            if (i === adIndex) {
                flattenedNodes.splice(p.index + idx, 0, ad);
            }
        })
    });

    return flattenedNodes;
}

export { insertAdPlaceholders }
