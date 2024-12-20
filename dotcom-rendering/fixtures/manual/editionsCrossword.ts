import type { FEEditionsCrossword } from '../../src/types/editionsCrossword';

export const quickCrossword: FEEditionsCrossword = {
	date: '2024-11-01T23:00:00Z',
	dateSolutionAvailable: '2024-11-01T23:00:00Z',
	dimensions: {
		cols: 13,
		rows: 13,
	},
	entries: [
		{
			clue: 'A quick crossword clue',
			direction: 'across',
			group: ['1-across'],
			humanNumber: '1',
			id: '1-across',
			length: 6,
			number: 1,
			position: {
				x: 0,
				y: 0,
			},
			separatorLocations: {},
			solution: 'AAAAAA',
			format: '6',
		},
	],
	hasNumbers: true,
	name: 'Quick crossword No 1',
	number: 1,
	randomCluesOrdering: false,
	solutionAvailable: true,
	type: 'quick',
};

export const crypticCrossword: FEEditionsCrossword = {
	date: '2024-11-01T23:00:00Z',
	dateSolutionAvailable: '2024-11-01T23:00:00Z',
	dimensions: {
		cols: 15,
		rows: 15,
	},
	entries: [
		{
			clue: 'A cryptic crossword clue',
			direction: 'down',
			group: ['7-down'],
			humanNumber: '7',
			id: '7-down',
			length: 8,
			number: 7,
			position: {
				x: 12,
				y: 0,
			},
			separatorLocations: {},
			solution: 'BBBBBBBB',
			format: '8',
		},
	],
	hasNumbers: true,
	name: 'Cryptic crossword No 2',
	number: 2,
	randomCluesOrdering: false,
	solutionAvailable: true,
	type: 'cryptic',
};
