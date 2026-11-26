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

	it('passes through featured and trivia hub tiles without experiment participation', () => {
		const page = createPuzzlesPage({
			layout: {
				containers: [
					featuredTriviaPuzzlesContainer,
					triviaPuzzlesContainer,
				],
			},
		});
		page.config = { ...page.config, edition: 'INT', serverSideABTests: {} };
		validate.mockReturnValue(page);
		const res = response();
		handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
		expect(res.status).toHaveBeenCalledWith(200);
		expect(renderPage).toHaveBeenCalledWith({ puzzlesPage: page });
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

	it.each(['INT', 'EUR', 'AU', 'US', 'UK'])(
		'renders the trivia archive without participation in %s',
		(edition) => {
			const page = {
				layout: { containers: [] },
				archive: { category: 'trivia-and-quizzes' },
				config: { edition, serverSideABTests: {} },
			};
			validate.mockReturnValue(page as never);
			const res = response();
			handlePuzzlesPage({ body: {} } as never, res as never, jest.fn());
			expect(res.status).toHaveBeenCalledWith(200);
			expect(renderPage).toHaveBeenCalledWith({ puzzlesPage: page });
		},
	);

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
});
