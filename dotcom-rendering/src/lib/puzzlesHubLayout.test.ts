import { triviaPuzzlesContainer } from '../../fixtures/manual/puzzlesPage';
import { withoutV2Puzzles } from './puzzlesHubLayout';

it('removes V2 games from nested and archive placements without mutating the layout', () => {
	const movieGrid = triviaPuzzlesContainer.content.items[0]![0]!;
	const wordWheel = { ...movieGrid, id: 'word-wheel', type: 'word-wheel' };
	const layout = {
		containers: [
			{
				id: 'word-games',
				title: 'Word games',
				content: {
					items: [[wordWheel, movieGrid], [movieGrid]],
					nestedContainers: [triviaPuzzlesContainer],
					archive: movieGrid,
					archiveChoices: [wordWheel, movieGrid],
				},
			},
		],
	};

	const filtered = withoutV2Puzzles(layout);
	expect(filtered.containers[0]!.content).toEqual({
		items: [[wordWheel]],
		nestedContainers: [],
		archive: undefined,
		archiveChoices: [wordWheel],
	});
	expect(layout.containers[0]!.content.items[0]).toHaveLength(2);
	expect(layout.containers[0]!.content.nestedContainers).toHaveLength(1);
});
