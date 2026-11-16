export type PuzzleActionSource = 'puzzle-page' | 'crossword-page';

export const puzzleActionAttributes = (
	source: PuzzleActionSource | undefined,
	action: string,
): { 'data-component'?: string; 'data-link-name'?: string } =>
	source === undefined
		? {}
		: {
				'data-component': `puzzles-actions:${source}`,
				'data-link-name': `puzzles | ${action}`,
			};
