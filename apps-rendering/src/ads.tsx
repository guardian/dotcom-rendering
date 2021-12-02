import { ThemeProvider } from '@emotion/react';
import { Button, buttonThemeBrandAlt } from '@guardian/source-react-components';
import Paragraph from 'components/paragraph';
import type { ReactElement, ReactNode } from 'react';
import { createElement as h, isValidElement } from 'react';

function getAdIndices(): number[] {
	const adEveryNParagraphs = 6;
	const firstAdIndex = 3;
	const totalAds = 15;

	const indiciesAfterFirstAd = [...Array(totalAds - 1).keys()].map(
		(index) => firstAdIndex + adEveryNParagraphs * ++index,
	);
	return [firstAdIndex, ...indiciesAfterFirstAd];
}

function insertPlaceholders(reactNodes: ReactNode[]): ReactNode[] {
	const adIndices = getAdIndices();

	const flattenedNodes = reactNodes.flat();

	const isPara = (node: ReactNode): boolean =>
		isValidElement(node) && node.type === Paragraph;

	const numParas = flattenedNodes.filter(isPara).length;

	const className =
		numParas < 15 ? 'ad-placeholder hidden short' : 'ad-placeholder hidden';

	const ad = (para: number): ReactElement =>
		h(
			'aside',
			{ className, key: `ad-after-${para}-para` },
			h(
				'div',
				{ className: 'ad-labels' },
				h('h1', null, 'Advertisement'),
			),
			h('div', { className: 'ad-slot' }, null),
			h(
				'div',
				{ className: 'upgrade-banner' },
				h('h1', null, 'Upgrade to Premium and enjoy the app ad-free.'),
				<ThemeProvider theme={buttonThemeBrandAlt}>
					<Button>Upgrade to Premium</Button>
				</ThemeProvider>,
			),
		);

	const insertAd = (para: number, nodes: ReactNode[]): ReactNode[] =>
		adIndices.includes(para) ? [...nodes, ad(para)] : nodes;

	return flattenedNodes.reduce<{ paraNum: number; nodes: ReactNode[] }>(
		({ paraNum, nodes: prevNodes }, node) => {
			const nodes = [...prevNodes, node];

			if (isPara(node)) {
				const newParaNum = paraNum + 1;
				return {
					paraNum: newParaNum,
					nodes: insertAd(newParaNum, nodes),
				};
			}

			return { paraNum, nodes };
		},
		{ paraNum: 0, nodes: [] },
	).nodes;
}

const getAdPlaceholderInserter = (
	shouldHideAdverts: boolean,
): ((reactNodes: ReactNode[]) => ReactNode[]) =>
	shouldHideAdverts
		? (reactNodes: ReactNode[]): ReactNode[] => reactNodes
		: insertPlaceholders;

export { getAdPlaceholderInserter };
