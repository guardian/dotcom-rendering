import { createGamePage } from '../../fixtures/manual/gamePage';
import { validateAsGamePageType } from './validate';

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const expectInvalid = (page: unknown) =>
	expect(() => validateAsGamePageType(page)).toThrow(
		'Unable to validate request body for game page.',
	);

describe('validateAsGamePageType', () => {
	it('accepts a valid iframe payload', () => {
		const page = createGamePage('sudoku-easy');
		expect(validateAsGamePageType(page).slug).toBe('sudoku-easy');
	});

	it.each([
		'id',
		'slug',
		'webTitle',
		'canonicalUrl',
		'editionId',
		'instance',
	])('rejects a missing required page field: %s', (field) => {
		const page = clone(createGamePage('sudoku-easy')) as unknown as Record<
			string,
			unknown
		>;
		delete page[field];
		expectInvalid(page);
	});

	it('rejects a config without server-side participations', () => {
		const page = clone(createGamePage('sudoku-easy')) as unknown as {
			config: Record<string, unknown>;
		};
		delete page.config.serverSideABTests;
		expectInvalid(page);
	});

	it('rejects navigation that is not an object', () => {
		const page = clone(createGamePage('sudoku-easy')) as unknown as {
			nav: unknown;
		};
		page.nav = [];
		expectInvalid(page);
	});

	it('rejects an unknown edition id', () => {
		const page = clone(createGamePage('sudoku-easy')) as unknown as {
			editionId: string;
		};
		page.editionId = 'NOT_AN_EDITION';
		expectInvalid(page);
	});

	it('rejects an instance missing its required title', () => {
		const page = clone(createGamePage('sudoku-easy'));
		(page.instance as unknown as { title?: string }).title = undefined;
		expectInvalid(page);
	});

	it('rejects an invalid item in moreFromPuzzlesAndGames', () => {
		const page = clone(createGamePage('sudoku-easy'));
		page.instance.moreFromPuzzlesAndGames = [
			{ id: 'bad' },
		] as unknown as typeof page.instance.moreFromPuzzlesAndGames;
		expectInvalid(page);
	});
});
