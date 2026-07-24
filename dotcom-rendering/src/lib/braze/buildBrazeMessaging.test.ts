import { getOphan } from '../../client/ophan/ophan';
import { buildBrazeMessaging } from './buildBrazeMessaging';
import { checkBrazeDependencies } from './checkBrazeDependencies';
import type { BrazeInstance } from './initialiseBraze';
import { getInitialisedBraze } from './initialiseBraze';

jest.mock('@guardian/libs', () => ({
	...jest.requireActual('@guardian/libs'),
	log: jest.fn(),
	startPerformanceMeasure: () => ({ endPerformanceMeasure: () => 0 }),
	storage: { local: { isAvailable: () => true } },
}));

jest.mock('@guardian/braze-components/logic', () => ({
	BrazeCards: jest.fn().mockImplementation(() => ({})),
	BrazeMessages: jest.fn().mockImplementation(() => ({})),
	canRenderBrazeMsg: jest.fn(),
	LocalMessageCache: { clear: jest.fn() },
	NullBrazeCards: jest.fn().mockImplementation(() => ({})),
	NullBrazeMessages: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../client/ophan/ophan', () => ({
	getOphan: jest.fn(),
}));

jest.mock('../hasCurrentBrazeUser', () => ({
	clearHasCurrentBrazeUser: jest.fn(),
	hasCurrentBrazeUser: jest.fn(() => false),
	setHasCurrentBrazeUser: jest.fn(),
}));

jest.mock('./checkBrazeDependencies');
jest.mock('./initialiseBraze', () => ({
	getInitialisedBraze: jest.fn(),
}));

const dependencyResult = {
	isSuccessful: true as const,
	data: {
		apiKey: 'api-key',
		brazeUuid: 'braze-user',
		consent: true,
		brazeSwitch: true,
	},
};

const makeBraze = (events: string[]): BrazeInstance =>
	({
		changeUser: jest.fn(() => events.push('changeUser')),
		requestBannersRefresh: jest.fn(
			(_placements: string[], success: () => void) => {
				events.push('requestBannersRefresh');
				success();
			},
		),
		openSession: jest.fn(() => events.push('openSession')),
		subscribeToBannersUpdates: jest.fn(() => 'subscription-id'),
	}) as unknown as BrazeInstance;

describe('buildBrazeMessaging banner initialisation', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		jest.mocked(checkBrazeDependencies).mockResolvedValue(dependencyResult);
		jest.mocked(getOphan).mockResolvedValue({
			record: jest.fn(),
		} as never);
		window.guardian.config.switches.brazeContentCards = false;
	});

	it('orders changeUser, banner refresh, then openSession', async () => {
		document.body.innerHTML =
			'<gu-island name="StickyBottomBanner"></gu-island>';
		const events: string[] = [];
		const braze = makeBraze(events);
		jest.mocked(getInitialisedBraze).mockResolvedValue(braze);

		await buildBrazeMessaging('https://id.test', true, 'Web');

		expect(events).toEqual([
			'changeUser',
			'requestBannersRefresh',
			'openSession',
		]);
		expect(braze.requestBannersRefresh).toHaveBeenCalledWith(
			['dotcom-rendering_banner'],
			expect.any(Function),
			expect.any(Function),
		);
	});

	it('does not spend a refresh token when the page has no banner islands', async () => {
		const events: string[] = [];
		const braze = makeBraze(events);
		jest.mocked(getInitialisedBraze).mockResolvedValue(braze);

		await buildBrazeMessaging('https://id.test', true, 'Web');

		expect(events).toEqual(['changeUser', 'openSession']);
		expect(braze.requestBannersRefresh).not.toHaveBeenCalled();
	});
});
