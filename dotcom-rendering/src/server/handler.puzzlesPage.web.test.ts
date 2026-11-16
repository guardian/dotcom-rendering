import {
	createPuzzlesPage,
	featuredTriviaPuzzlesContainer,
	triviaPuzzlesContainer,
} from '../../fixtures/manual/puzzlesPage';
import { validateAsPuzzlesPageType } from '../model/validate';
import { handlePuzzlesPage } from './handler.puzzlesPage.web';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

jest.mock('../model/validate');
jest.mock('./render.puzzlesPage.web');

const validate = jest.mocked(validateAsPuzzlesPageType);
const renderPage = jest.mocked(renderPuzzlesPage);

const response = () => {
	const res = {
		status: jest.fn(),
		set: jest.fn(),
		send: jest.fn(),
		sendStatus: jest.fn(),
	};
	res.status.mockReturnValue(res);
	res.set.mockReturnValue(res);
	return res;
};

describe('handlePuzzlesPage', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		renderPage.mockReturnValue({
			html: '<main>Puzzles</main>',
			prefetchScripts: [],
		});
	});

	it.each([
		['no V2 participation', {}, false],
		['V2 control', { 'puzzles-new-hub-v2': 'control' }, false],
		['V2 unknown', { 'puzzles-new-hub-v2': 'unknown' }, false],
		['V2 variant', { 'puzzles-new-hub-v2': 'variant' }, true],
	] as const)(
		'gates trivia and featured games for %s without changing V1 cards',
		(_, serverSideABTests, showV2) => {
			const existing = {
				...triviaPuzzlesContainer.content.items[0]![0]!,
				id: 'word-wheel',
				title: 'Word wheel',
				type: 'word-wheel',
				slug: 'word-games/word-wheel',
			};
			const featured = {
				...featuredTriviaPuzzlesContainer,
				content: {
					...featuredTriviaPuzzlesContainer.content,
					items: [
						[
							existing,
							...featuredTriviaPuzzlesContainer.content.items[0]!,
						],
					],
				},
			};
			const page = createPuzzlesPage({
				layout: { containers: [featured, triviaPuzzlesContainer] },
			});
			page.config = { ...page.config, edition: 'INT', serverSideABTests };
			validate.mockReturnValue(page);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());

			const rendered = renderPage.mock.calls[0]![0].puzzlesPage;
			expect(res.status).toHaveBeenCalledWith(200);
			expect(
				rendered.layout.containers.some(
					(container) => container.id === 'trivia-and-quizzes',
				),
			).toBe(showV2);
			expect(rendered.layout.containers[0]!.content.items[0]).toEqual(
				showV2 ? featured.content.items[0] : [existing],
			);
			expect(page.layout.containers).toHaveLength(2);
			expect(page.layout.containers[0]!.content.items[0]).toHaveLength(3);
		},
	);

	it('retains V2 cards in local development without participation', () => {
		const previous = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';
		try {
			const page = createPuzzlesPage({
				layout: { containers: [triviaPuzzlesContainer] },
			});
			validate.mockReturnValue(page);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			expect(renderPage).toHaveBeenCalledWith({ puzzlesPage: page });
		} finally {
			process.env.NODE_ENV = previous;
		}
	});

	it('renders for the International edition outside development', () => {
		validate.mockReturnValue({
			layout: { containers: [] },
			config: { edition: 'INT', serverSideABTests: {} },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(renderPage).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each([
		['International edition only', 'INT', {}, false],
		[
			'V2 variant outside International',
			'UK',
			{ 'puzzles-new-hub-v2': 'variant' },
			false,
		],
		[
			'International with V2 control',
			'INT',
			{ 'puzzles-new-hub-v2': 'control' },
			false,
		],
		[
			'International with V2 variant',
			'INT',
			{ 'puzzles-new-hub-v2': 'variant' },
			true,
		],
	] as const)(
		'gates the trivia archive for %s',
		(_, edition, serverSideABTests, allowed) => {
			validate.mockReturnValue({
				layout: { containers: [] },
				archive: { category: 'trivia-and-quizzes' },
				config: { edition, serverSideABTests },
			} as never);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			if (allowed) {
				expect(renderPage).toHaveBeenCalledTimes(1);
			} else {
				expect(res.sendStatus).toHaveBeenCalledWith(404);
				expect(renderPage).not.toHaveBeenCalled();
			}
		},
	);

	it('keeps V2 recommendations out of existing archives', () => {
		const existing = {
			...triviaPuzzlesContainer.content.items[0]![0]!,
			type: 'word-wheel',
		};
		validate.mockReturnValue({
			layout: { containers: [] },
			archive: {
				category: 'word-games',
				moreFrom: [
					existing,
					...triviaPuzzlesContainer.content.items[0]!,
				],
			},
			config: { edition: 'INT', serverSideABTests: {} },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(
			renderPage.mock.calls[0]![0].puzzlesPage.archive?.moreFrom,
		).toEqual([existing]);
	});

	it('renders an archive payload for the International edition', () => {
		validate.mockReturnValue({
			layout: { containers: [] },
			archive: { moreFrom: [] },
			config: { edition: 'INT', serverSideABTests: {} },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(renderPage).toHaveBeenCalledTimes(1);
	});

	it('does not render an archive outside the International edition', () => {
		validate.mockReturnValue({
			layout: { containers: [] },
			archive: { moreFrom: [] },
			config: { edition: 'UK', serverSideABTests: {} },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(renderPage).not.toHaveBeenCalled();
	});

	it('renders outside the International edition in local development', () => {
		const previousNodeEnvironment = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';
		validate.mockReturnValue({
			layout: { containers: [] },
			config: { edition: 'UK', serverSideABTests: {} },
		} as never);
		const res = response();

		try {
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			expect(renderPage).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			process.env.NODE_ENV = previousNodeEnvironment;
		} finally {
			if (previousNodeEnvironment === undefined) {
				delete process.env.NODE_ENV;
			} else {
				process.env.NODE_ENV = previousNodeEnvironment;
			}
		}
	});

	it.each(['UK', 'US', 'AU', 'EUR'])(
		'returns 404 without mounting the renderer for the %s edition',
		(edition) => {
			validate.mockReturnValue({
				layout: { containers: [] },
				config: { edition, serverSideABTests: {} },
			} as never);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			expect(res.sendStatus).toHaveBeenCalledWith(404);
			expect(renderPage).not.toHaveBeenCalled();
		},
	);
});
