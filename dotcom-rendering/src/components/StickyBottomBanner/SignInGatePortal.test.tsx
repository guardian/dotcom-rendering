// Mock the auxia module before imports so the mock is applied when the module
// under test is evaluated.
import { buildAuxiaGateDisplayData } from '../../lib/auxia';
import { incrementGandalfPageViewCount } from '../../lib/gandalf';
import type { AuxiaAPIResponseDataUserTreatment } from '../SignInGate/types';
import type { AuxiaGateDisplayData } from '../SignInGate/types';
import type { CanShowSignInGateProps } from './SignInGatePortal';
import { canShowSignInGatePortal } from './SignInGatePortal';

// Mock the auxia module (Jest hoists jest.mock calls so placing it after imports is fine).
jest.mock('../../lib/auxia', () => ({
	buildAuxiaGateDisplayData: jest.fn(),
}));

jest.mock('../../lib/gandalf', () => ({
	getGandalfPageViewCount: jest.fn().mockReturnValue(0),
	incrementGandalfPageViewCount: jest.fn(),
}));

// Mock document.getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
	value: mockGetElementById,
});

const canShowProps: CanShowSignInGateProps = {
	isSignedIn: false,
	isPaidContent: false,
	isPreview: false,
	pageId: 'page-id',
	contributionsServiceUrl: 'https://contributions.local',
	editionId: 'UK',
	contentType: 'Article',
	sectionId: 'section',
	tags: [],
	ophanPageViewId: 'test-page-view-id',
	countryCode: 'NZ',
};

const mockIncrementGandalfPageViewCount = jest.mocked(
	incrementGandalfPageViewCount,
);

const makeUserTreatment = (
	treatmentType: AuxiaAPIResponseDataUserTreatment['treatmentType'],
): AuxiaAPIResponseDataUserTreatment => ({
	treatmentId: 't1',
	treatmentTrackingId: 'tt1',
	rank: '1',
	contentLanguageCode: 'en',
	treatmentContent: 'content',
	treatmentType,
	surface: 'surface',
});

const makeAuxiaReturn = (
	userTreatment: AuxiaAPIResponseDataUserTreatment | undefined,
	gandalfSignInGate?: boolean,
): AuxiaGateDisplayData => ({
	browserId: 'browser-1',
	auxiaData: {
		responseId: 'resp1',
		userTreatment,
		...(gandalfSignInGate !== undefined ? { gandalfSignInGate } : {}),
	},
});

describe('SignInGatePortal', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Enable the switch for all tests
		window.guardian.config.switches.signInGate = true;
	});

	describe('canShowSignInGatePortal', () => {
		it('should return false when sign-in gate placeholder does not exist', async () => {
			mockGetElementById.mockReturnValue(null);

			const result = await canShowSignInGatePortal(canShowProps);

			expect(result).toEqual({ show: false });
			expect(mockGetElementById).toHaveBeenCalledWith('sign-in-gate');
		});

		it('should return false when user is signed in', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal({
				...canShowProps,
				isSignedIn: true,
			});

			expect(result).toEqual({ show: false });
		});

		it('should return false when content is paid', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal({
				...canShowProps,
				isPaidContent: true,
			});

			expect(result).toEqual({ show: false });
		});

		it('should return false when in preview mode', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal({
				...canShowProps,
				isPreview: true,
			});

			expect(result).toEqual({ show: false });
		});

		it('should return false when signInGate is false', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			window.guardian.config.switches.signInGate = false;

			// Mock buildAuxiaGateDisplayData to return auxiaData with userTreatment
			const auxiaReturn: AuxiaGateDisplayData = {
				browserId: 'browser-1',
				auxiaData: {
					responseId: 'resp1',
					userTreatment: {
						treatmentId: 't1',
						treatmentTrackingId: 'tt1',
						rank: '1',
						contentLanguageCode: 'en',
						treatmentContent: 'content',
						treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
						surface: 'surface',
					},
				},
			};
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			const result = await canShowSignInGatePortal(canShowProps);

			expect(result).toEqual({ show: false });
		});

		it('should return true when conditions are met for showing gate', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			// Mock buildAuxiaGateDisplayData to return auxiaData with userTreatment
			const auxiaReturn: AuxiaGateDisplayData = {
				browserId: 'browser-1',
				auxiaData: {
					responseId: 'resp1',
					userTreatment: {
						treatmentId: 't1',
						treatmentTrackingId: 'tt1',
						rank: '1',
						contentLanguageCode: 'en',
						treatmentContent: 'content',
						treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
						surface: 'surface',
					},
				},
			};
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			const result = await canShowSignInGatePortal(canShowProps);

			expect(result).toEqual({
				show: true,
				meta: { ...auxiaReturn, gandalfCountryCode: 'NZ' },
			});
		});

		it('should return true when isSignedIn is undefined but other params allow gate', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const auxiaReturn: AuxiaGateDisplayData = {
				browserId: 'browser-2',
				auxiaData: {
					responseId: 'resp2',
					userTreatment: {
						treatmentId: 't2',
						treatmentTrackingId: 'tt2',
						rank: '1',
						contentLanguageCode: 'en',
						treatmentContent: 'content',
						treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
						surface: 'surface',
					},
				},
			};
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			const result = await canShowSignInGatePortal({
				...canShowProps,
				isSignedIn: undefined,
			});

			expect(result).toEqual({
				show: true,
				meta: { ...auxiaReturn, gandalfCountryCode: 'NZ' },
			});
		});
	});

	describe('Gandalf (Guardian-managed sign-in gate journey)', () => {
		it('sends the current per-country pageview count to SDC', async () => {
			mockGetElementById.mockReturnValue(document.createElement('div'));
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(makeAuxiaReturn(undefined, true));

			await canShowSignInGatePortal(canShowProps);

			expect(buildAuxiaGateDisplayData).toHaveBeenCalledWith(
				'https://contributions.local',
				'page-id',
				'UK',
				'Article',
				'section',
				[],
				0,
				0,
			);
		});

		it('counts the pageview when SDC returns the active Gandalf marker without a treatment', async () => {
			mockGetElementById.mockReturnValue(document.createElement('div'));
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(makeAuxiaReturn(undefined, true));

			const result = await canShowSignInGatePortal(canShowProps);

			// No gate on a free pageview, but the pageview counted. The meta
			// carries the country so the selector can build the Ophan variant.
			expect(result).toEqual({
				show: false,
				meta: {
					...makeAuxiaReturn(undefined, true),
					gandalfCountryCode: 'NZ',
				},
			});
			expect(mockIncrementGandalfPageViewCount).toHaveBeenCalledWith(
				'NZ',
				'test-page-view-id',
			);
		});

		it('counts the pageview when SDC returns the Gandalf popup treatment', async () => {
			mockGetElementById.mockReturnValue(document.createElement('div'));
			const auxiaReturn = makeAuxiaReturn(
				makeUserTreatment('NONDISMISSIBLE_SIGN_IN_GATE_POPUP'),
				true,
			);
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			const result = await canShowSignInGatePortal(canShowProps);

			expect(result).toEqual({
				show: true,
				meta: { ...auxiaReturn, gandalfCountryCode: 'NZ' },
			});
			expect(mockIncrementGandalfPageViewCount).toHaveBeenCalledWith(
				'NZ',
				'test-page-view-id',
			);
		});

		it('does not count the pageview without the Gandalf marker', async () => {
			mockGetElementById.mockReturnValue(document.createElement('div'));
			const auxiaReturn = makeAuxiaReturn(
				makeUserTreatment('DISMISSABLE_SIGN_IN_GATE'),
			);
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			const result = await canShowSignInGatePortal(canShowProps);

			expect(result).toEqual({
				show: true,
				meta: { ...auxiaReturn, gandalfCountryCode: 'NZ' },
			});
			expect(mockIncrementGandalfPageViewCount).not.toHaveBeenCalled();
		});

		it('does not count the pageview when the marker is explicitly false', async () => {
			mockGetElementById.mockReturnValue(document.createElement('div'));
			const auxiaReturn = makeAuxiaReturn(
				makeUserTreatment('DISMISSABLE_SIGN_IN_GATE'),
				false,
			);
			(
				buildAuxiaGateDisplayData as jest.MockedFunction<
					typeof buildAuxiaGateDisplayData
				>
			).mockResolvedValue(auxiaReturn);

			await canShowSignInGatePortal(canShowProps);

			expect(mockIncrementGandalfPageViewCount).not.toHaveBeenCalled();
		});
	});
});
