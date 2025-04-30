import type { CAPICrossword } from '@guardian/react-crossword/dist/@types/CAPI';

export const quickCrossword: CAPICrossword = {
	date: 1730598000000,
	dateSolutionAvailable: 1730598000000,
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
		},
	],
	name: 'Quick crossword No 1',
	number: 1,

	solutionAvailable: true,
	crosswordType: 'cryptic',
	id: '',
};

export const crypticCrossword: CAPICrossword = {
	date: 1730598000000,
	dateSolutionAvailable: 1730598000000,
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
		},
	],
	name: 'Cryptic crossword No 2',
	number: 2,
	solutionAvailable: true,
	crosswordType: 'cryptic',
	id: '',
};
