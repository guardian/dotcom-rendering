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

	it('renders for the International edition outside development', () => {
		validate.mockReturnValue({
			config: { edition: 'INT' },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(renderPage).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('renders an archive payload for the International edition', () => {
		validate.mockReturnValue({
			archive: {},
			config: { edition: 'INT' },
		} as never);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(renderPage).toHaveBeenCalledTimes(1);
	});

	it('does not render an archive outside the International edition', () => {
		validate.mockReturnValue({
			archive: {},
			config: { edition: 'UK' },
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
			config: { edition: 'UK' },
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
				config: { edition },
			} as never);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			expect(res.sendStatus).toHaveBeenCalledWith(404);
			expect(renderPage).not.toHaveBeenCalled();
		},
	);
});
