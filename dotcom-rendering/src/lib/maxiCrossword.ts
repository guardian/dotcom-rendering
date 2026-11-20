import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';

export const isMaxiCrossword = (item: PuzzleItem): boolean =>
	item.type === 'crossword' && item.set === 'maxi';

const withoutMaxi = (items: PuzzleItem[]): PuzzleItem[] =>
	items.filter((item) => !isMaxiCrossword(item));

const filterContainer = (container: PuzzleContainer): PuzzleContainer => {
	const { archive, archiveChoices, items, nestedContainers } =
		container.content;
	const choices = archiveChoices && withoutMaxi(archiveChoices);
	return {
		...container,
		content: {
			items: items.map(withoutMaxi).filter((row) => row.length > 0),
			nestedContainers: nestedContainers.map(filterContainer),
			archive: archive && !isMaxiCrossword(archive) ? archive : undefined,
			archiveChoices:
				choices !== undefined && choices.length > 0
					? choices
					: undefined,
		},
	};
};

export const withoutMaxiCards = (
	layout: PuzzlesLayoutType,
): PuzzlesLayoutType => ({
	...layout,
	containers: layout.containers.map(filterContainer),
});
