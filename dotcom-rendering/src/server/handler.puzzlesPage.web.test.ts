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

	it('renders the exact variant participation outside development', () => {
		validate.mockReturnValue({
			config: { serverSideABTests: { 'puzzles-new-hub': 'variant' } },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(renderPage).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('renders without experiment participation in local development', () => {
		const previousNodeEnvironment = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';
		validate.mockReturnValue({
			config: { serverSideABTests: {} },
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

	it.each([
		['control', { 'puzzles-new-hub': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub': 'unknown' }],
		['unrelated', { unrelated: 'variant' }],
	])('returns 404 without mounting the renderer for %s', (_, tests) => {
		validate.mockReturnValue({
			config: { serverSideABTests: tests },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(renderPage).not.toHaveBeenCalled();
	});
});
