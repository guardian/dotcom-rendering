import { FourOrLess } from './FourOrLess';

type Props = {
	content: TrailType[];
	containerPalette?: DCRContainerPalette;
};

function getCardRows(
	allCards: TrailType[],
	maxRowLength: number,
): TrailType[][] {
	if (allCards.length === 0) return [];
	const rows = [];
	for (let i = 0; i <= allCards.length; i += maxRowLength) {
		rows.push(allCards.slice(i, i + maxRowLength));
	}
	return rows;
}

export const MoreThanEight = ({ content, containerPalette }: Props) => {
	const rows = getCardRows(content, 4);
	return (
		<>
			{rows.map((row) => (
				<FourOrLess
					content={row}
					containerPalette={containerPalette}
					showImages={false}
				/>
			))}
		</>
	);
};
