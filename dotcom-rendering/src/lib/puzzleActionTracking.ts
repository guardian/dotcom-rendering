import type { CrosswordProps } from '@guardian/react-crossword';
import type { PuzzleProvider } from '../model/puzzles/puzzleConfigs';

export type PuzzleActionSource = 'puzzle-page' | 'crossword-page';

export type PuzzleActionContext = {
	slug: string;
	date?: string;
	provider: PuzzleProvider | 'guardian-crossword';
};

export const crosswordActionContext = (
	crossword:
		| Pick<CrosswordProps['data'], 'crosswordType' | 'date'>
		| undefined,
): PuzzleActionContext | undefined => {
	if (crossword === undefined) return undefined;
	const date = new Date(crossword.date);
	return {
		slug: crossword.crosswordType,
		date: Number.isFinite(date.getTime())
			? date.toISOString().slice(0, 10)
			: undefined,
		provider: 'guardian-crossword',
	};
};

export const puzzleActionAttributes = (
	source: PuzzleActionSource | undefined,
	action: string,
	context?: PuzzleActionContext,
): { 'data-component'?: string; 'data-link-name'?: string } => {
	if (source === undefined) return {};
	const labels = ['puzzles', action];
	if (context !== undefined) {
		labels.push(`slug-${context.slug}`);
		if (
			context.date !== undefined &&
			/^\d{4}-\d{2}-\d{2}$/.test(context.date)
		) {
			const date = new Date(`${context.date}T00:00:00Z`);
			if (
				Number.isFinite(date.getTime()) &&
				date.toISOString().slice(0, 10) === context.date
			) {
				labels.push(`date-${context.date}`);
			}
		}
		labels.push(`provider-${context.provider}`);
	}
	return {
		'data-component': `puzzles-actions:${source}`,
		'data-link-name': labels.join(' | '),
	};
};
