export type FEEditionsCrosswords = {
	crosswords: FEEditionsCrossword[];
};

type FECrosswordEntry = {
	id: string;
	number: number;
	humanNumber: string;
	direction: 'across' | 'down';
	position: { x: number; y: number };
	separatorLocations: {
		','?: number[];
		'-'?: number[];
	};
	length: number;
	clue: string;
	group: string[];
	solution?: string;
};

type FECrosswordDimensions = {
	cols: number;
	rows: number;
};

export type FEEditionsCrossword = {
	name: string;
	type: string;
	number: number;
	date: string;
	dimensions: FECrosswordDimensions;
	entries: FECrosswordEntry[];
	solutionAvailable: boolean;
	hasNumbers: boolean;
	randomCluesOrdering: boolean;
	instructions?: string;
	creator?: { name: string; webUrl: string };
	pdf?: string;
	annotatedSolution?: string;
	dateSolutionAvailable: string;
};
