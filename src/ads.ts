import type { ArticleFormat } from '@guardian/libs';
import AdSlot from 'adSlot';
import Paragraph from 'components/Paragraph';
import type { ReactNode } from 'react';
import { createElement as h, isValidElement } from 'react';

function getAdIndices(): number[] {
	const adEveryNParagraphs = 6;
	const firstAdIndex = 3;
	const totalAds = 15;

	const indicesAfterFirstAd = [...Array(totalAds - 1).keys()].map(
		(index) => firstAdIndex + adEveryNParagraphs * ++index,
	);
	return [firstAdIndex, ...indicesAfterFirstAd];
}

function insertPlaceholders(
	reactNodes: ReactNode[],
	format: ArticleFormat,
): ReactNode[] {
	const adIndices = getAdIndices();

	const flattenedNodes = reactNodes.flat();

	const isPara = (node: ReactNode): boolean =>
		isValidElement(node) && node.type === Paragraph;

	const numParas = flattenedNodes.filter(isPara).length;

	const className =
		numParas < 15 ? 'ad-placeholder hidden short' : 'ad-placeholder hidden';

	const insertAd = (paragraph: number, nodes: ReactNode[]): ReactNode[] =>
		adIndices.includes(paragraph)
			? [...nodes, h(AdSlot, { className, paragraph, format })]
			: nodes;

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
): ((reactNodes: ReactNode[], format: ArticleFormat) => ReactNode[]) =>
	shouldHideAdverts
		? (reactNodes: ReactNode[]): ReactNode[] => reactNodes
		: insertPlaceholders;

export { getAdPlaceholderInserter };
