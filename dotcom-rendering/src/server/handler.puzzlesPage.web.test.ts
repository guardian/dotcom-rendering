import type { Request, Response } from 'express';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import {
	puzzlesHubExperiment,
	puzzlesHubParticipation,
} from '../lib/puzzlesHubExperiment';
import { handlePuzzlesPage } from './handler.puzzlesPage.web';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

jest.mock('./render.puzzlesPage.web', () => ({
	renderPuzzlesPage: jest.fn(),
}));

const mockedRenderPuzzlesPage = jest.mocked(renderPuzzlesPage);

const response = () => {
	const res = {
		status: jest.fn(),
		set: jest.fn(),
		send: jest.fn(),
		sendStatus: jest.fn(),
	};
	res.status.mockReturnValue(res);
	res.set.mockReturnValue(res);
	res.send.mockReturnValue(res);
	res.sendStatus.mockReturnValue(res);
	return res;
};

const pageWithParticipations = (serverSideABTests: Record<string, string>) =>
	createPuzzlesPage({
		config: {
			...createPuzzlesPage().config,
			serverSideABTests,
		},
	});

const invokeHandler = (body: unknown, res: ReturnType<typeof response>) =>
	handlePuzzlesPage(
		{ body } as Request,
		res as unknown as Response,
		jest.fn(),
	);

describe('handlePuzzlesPage', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedRenderPuzzlesPage.mockReturnValue({
			html: '<html>Puzzles</html>',
			prefetchScripts: ['/assets/index.js'],
		});
	});

	it('renders the page for the configured variant', () => {
		const res = response();
		const page = pageWithParticipations(
			puzzlesHubParticipation(puzzlesHubExperiment.variant),
		);

		invokeHandler(page, res);

		expect(mockedRenderPuzzlesPage).toHaveBeenCalledWith({
			puzzlesPage: page,
		});
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.set).toHaveBeenCalledWith(
			'Link',
			expect.stringContaining('/assets/index.js'),
		);
		expect(res.send).toHaveBeenCalledWith('<html>Puzzles</html>');
	});

	it.each([
		['control', puzzlesHubParticipation(puzzlesHubExperiment.control)],
		['absent', {}],
		['malformed', puzzlesHubParticipation('variant:extra')],
		['unknown group', puzzlesHubParticipation('unknown')],
		['unrelated', { 'another-test': 'variant' }],
	])('returns 404 and does not render for %s participation', (_, tests) => {
		const res = response();

		invokeHandler(pageWithParticipations(tests), res);

		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(mockedRenderPuzzlesPage).not.toHaveBeenCalled();
	});

	it('rejects an invalid payload without invoking the renderer', () => {
		const res = response();
		const invalidPage = pageWithParticipations(
			puzzlesHubParticipation(puzzlesHubExperiment.variant),
		) as unknown as Record<string, unknown>;
		delete invalidPage.layout;

		expect(() => invokeHandler(invalidPage, res)).toThrow(TypeError);
		expect(mockedRenderPuzzlesPage).not.toHaveBeenCalled();
	});
});
