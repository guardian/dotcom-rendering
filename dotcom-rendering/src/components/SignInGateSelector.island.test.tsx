import { storage } from '@guardian/libs';
import { cleanup, render, screen as testScreen } from '@testing-library/react';
import { StrictMode } from 'react';
import { useIsInView } from '../lib/useIsInView';
import { submitComponentEventTracking } from './SignInGate/componentEventTracking';
import type { AuxiaAPIResponseDataUserTreatment } from './SignInGate/types';
import { SignInGateSelector } from './SignInGateSelector.island';

jest.mock('../lib/useIsInView', () => ({ useIsInView: jest.fn() }));
jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: () => 'test-page-view',
}));
jest.mock('./ConfigContext', () => ({
	useConfig: () => ({ renderingTarget: 'Web' }),
}));
jest.mock('./SignInGate/componentEventTracking', () => ({
	submitComponentEventTracking: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('./SignInGate/gateDesigns/SignInGateAuxiaV1', () => ({
	SignInGateAuxiaV1: () => <div data-testid="v1-gate" />,
}));
jest.mock('./SignInGate/gateDesigns/SignInGateAuxiaV2', () => ({
	SignInGateAuxiaV2: () => <div data-testid="v2-gate" />,
}));

const makeTreatment = (
	overrides: Partial<AuxiaAPIResponseDataUserTreatment> = {},
): AuxiaAPIResponseDataUserTreatment => ({
	treatmentId: 'test-treatment',
	treatmentTrackingId: 'test-tracking',
	treatmentType: 'NONDISMISSIBLE_SIGN_IN_GATE_POPUP',
	treatmentContent: '{}',
	rank: '1',
	contentLanguageCode: 'en',
	surface: 'test-surface',
	...overrides,
});

const makeProps = (
	userTreatment = makeTreatment(),
	gandalfSignInGate = true,
) => ({
	isPaidContent: false,
	isPreview: false,
	pageId: 'crosswords/quick/16914',
	contributionsServiceUrl: 'https://contributions.example.com',
	auxiaGateDisplayData: {
		browserId: undefined,
		gandalfCountryCode: 'NZ',
		auxiaData: {
			responseId: 'test-response',
			gandalfSignInGate,
			userTreatment,
		},
	},
});

const mockSetNode = jest.fn();
const mockUseIsInView = jest.mocked(useIsInView);
const mockTrack = jest.mocked(submitComponentEventTracking);
const mockModalOpen = jest.fn();
const mockFetch = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();
const originalFetch = global.fetch;

const expectViews = (count: number) => {
	expect(mockTrack).toHaveBeenCalledTimes(count);
	expect(storage.local.getRaw('gate_display_count')).toBe(String(count));
	expect(mockModalOpen).toHaveBeenCalledTimes(count);
};

describe('SignInGateSelector view tracking', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		global.fetch = mockFetch;
		mockFetch.mockResolvedValue({
			json: () => Promise.resolve({}),
		} as Response);
		storage.local.setRaw('gate_display_count', '0');
		mockUseIsInView.mockReturnValue([null, mockSetNode]);
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			configurable: true,
			value: 3000,
		});
		document.addEventListener('modal:open', mockModalOpen);
	});

	afterEach(() => {
		cleanup();
		document.removeEventListener('modal:open', mockModalOpen);
		jest.restoreAllMocks();
		global.fetch = originalFetch;
	});

	it('shows a mandatory popup without scrolling and does not recount when the placeholder becomes visible', () => {
		const props = makeProps();
		const { rerender } = render(<SignInGateSelector {...props} />);

		expect(testScreen.getByTestId('v2-gate')).toBeInTheDocument();
		expectViews(1);
		expect(mockTrack).toHaveBeenCalledWith(
			expect.objectContaining({ action: 'VIEW' }),
			'Web',
		);

		mockUseIsInView.mockReturnValue([true, mockSetNode]);
		rerender(<SignInGateSelector {...props} />);
		expect(testScreen.getByTestId('v2-gate')).toBeInTheDocument();
		expectViews(1);
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it('does not recount an equivalent treatment supplied as a new object', () => {
		const { rerender } = render(<SignInGateSelector {...makeProps()} />);
		rerender(<SignInGateSelector {...makeProps()} />);
		expectViews(1);
	});

	it.each([
		{ treatmentId: 'another-treatment' },
		{ treatmentTrackingId: 'another-tracking' },
	])('records a new treatment identity: %j', (identity) => {
		const { rerender } = render(<SignInGateSelector {...makeProps()} />);
		rerender(
			<SignInGateSelector {...makeProps(makeTreatment(identity))} />,
		);
		expectViews(2);
	});

	it('records another view when the gate is unmounted and displayed again', () => {
		const { unmount } = render(<SignInGateSelector {...makeProps()} />);
		unmount();
		render(<SignInGateSelector {...makeProps()} />);
		expectViews(2);
	});

	it('does not duplicate a view when StrictMode replays effects', () => {
		render(
			<StrictMode>
				<SignInGateSelector {...makeProps()} />
			</StrictMode>,
		);
		expectViews(1);
	});

	it('keeps a dismissible popup deferred until visibility and records it only once', () => {
		const treatment = makeTreatment({
			treatmentType: 'DISMISSABLE_SIGN_IN_GATE_POPUP',
		});
		const { rerender } = render(
			<SignInGateSelector {...makeProps(treatment)} />,
		);
		expect(testScreen.queryByTestId('v2-gate')).not.toBeInTheDocument();
		expectViews(0);

		mockUseIsInView.mockReturnValue([true, mockSetNode]);
		rerender(<SignInGateSelector {...makeProps(treatment)} />);
		expect(testScreen.getByTestId('v2-gate')).toBeInTheDocument();
		expectViews(1);
		rerender(<SignInGateSelector {...makeProps({ ...treatment })} />);
		expectViews(1);
	});

	it('preserves inline gate rendering and visibility-based tracking', () => {
		const props = makeProps(
			makeTreatment({ treatmentType: 'DISMISSABLE_SIGN_IN_GATE' }),
		);
		const { rerender } = render(<SignInGateSelector {...props} />);
		expect(testScreen.getByTestId('v1-gate')).toBeInTheDocument();
		expectViews(0);
		mockUseIsInView.mockReturnValue([true, mockSetNode]);
		rerender(<SignInGateSelector {...props} />);
		expectViews(1);
	});

	it('records the Auxia VIEWED interaction only once for non-Gandalf treatments', () => {
		const props = makeProps(makeTreatment(), false);
		const { rerender } = render(<SignInGateSelector {...props} />);
		mockUseIsInView.mockReturnValue([true, mockSetNode]);
		rerender(<SignInGateSelector {...props} />);
		expectViews(1);
		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://contributions.example.com/auxia/log-treatment-interaction',
			expect.objectContaining({ method: 'POST' }),
		);
		expect(mockFetch.mock.calls[0]?.[1]?.body).toContain(
			'"interactionType":"VIEWED"',
		);
	});
});
