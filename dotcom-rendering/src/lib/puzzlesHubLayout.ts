import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';

const isV2Puzzle = (item: PuzzleItem): boolean =>
	item.type === 'film-reveal' || item.type === 'on-the-ball';

export const withoutV2PuzzleItems = (items: PuzzleItem[]): PuzzleItem[] =>
	items.filter((item) => !isV2Puzzle(item));

/** Remove V2 games from every hub placement, including featured cards. */
export const withoutV2Puzzles = (
	layout: PuzzlesLayoutType,
): PuzzlesLayoutType => {
	const filterContainers = (
		containers: PuzzleContainer[],
	): PuzzleContainer[] =>
		containers
			.filter((container) => container.id !== 'trivia-and-quizzes')
			.map((container) => ({
				...container,
				content: {
					...container.content,
					items: container.content.items
						.map(withoutV2PuzzleItems)
						.filter((row) => row.length > 0),
					nestedContainers: filterContainers(
						container.content.nestedContainers,
					),
					archive:
						container.content.archive &&
						!isV2Puzzle(container.content.archive)
							? container.content.archive
							: undefined,
					archiveChoices: container.content.archiveChoices?.filter(
						(item) => !isV2Puzzle(item),
					),
				},
			}));

	return { ...layout, containers: filterContainers(layout.containers) };
};
