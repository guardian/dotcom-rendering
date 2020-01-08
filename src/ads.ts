import { createElement as h, ReactNode } from 'react';

function insertAdPlaceholders(reactNodes: ReactNode[]): ReactNode[] {
    const adIndices = [3, 9];
    const flattenedNodes = reactNodes.flat();

    const isPara = (node: { type: { name?: string } }): boolean => node?.type?.name === 'Paragraph';
    const numParas = flattenedNodes.filter(isPara).length;

    const className = numParas < 15 ? 'ad-placeholder short' : 'ad-placeholder';

    const ad = (key: number) => h('aside', { className, key },
        h('div', { className: 'ad-labels' },
            h('h1', null, 'Advertisement'),
            h('button', { className: 'ad-hide' },
                h('span', null, 'Hide')
            )
        )
    );

    const insertAd = (para: number, nodes: ReactNode[]): ReactNode[] =>
        adIndices.includes(para) ? [...nodes, ad(++para)] : nodes;

    return flattenedNodes
        .reduce(([paraNum, prevNodes], node) => {
            const nodes = [ ...prevNodes, node ];
            if (isPara(node)) {
                const newParaNum = paraNum + 1;
                return [ newParaNum, insertAd(newParaNum, nodes) ];
            }
            return [ paraNum, nodes ];
        }, [0, []])
        .pop();
}

export { insertAdPlaceholders }
