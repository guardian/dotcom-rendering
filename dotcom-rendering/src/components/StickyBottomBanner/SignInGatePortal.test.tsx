// Mock the auxia module before imports so the mock is applied when the module
// under test is evaluated.
import { buildAuxiaGateDisplayData } from '../../lib/auxia';
import type { AuxiaGateDisplayData } from '../SignInGate/types';
import { canShowSignInGatePortal } from './SignInGatePortal';

// Mock the auxia module (Jest hoists jest.mock calls so placing it after imports is fine).
jest.mock('../../lib/auxia', () => ({
	buildAuxiaGateDisplayData: jest.fn(),
}));

// Mock document.getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
	value: mockGetElementById,
});

describe('SignInGatePortal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('canShowSignInGatePortal', () => {
		it('should return false when sign-in gate placeholder does not exist', async () => {
			mockGetElementById.mockReturnValue(null);

			const result = await canShowSignInGatePortal(false, false, false);

			expect(result).toEqual({ show: false });
			expect(mockGetElementById).toHaveBeenCalledWith('sign-in-gate');
		});

		it('should return false when user is signed in', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal(true, false, false);

			expect(result).toEqual({ show: false });
		});

		it('should return false when content is paid', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal(false, true, false);

			expect(result).toEqual({ show: false });
		});

		it('should return false when in preview mode', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal(false, false, true);

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

			const result = await canShowSignInGatePortal(
				false, // isSignedIn
				false, // isPaidContent
				false, // isPreview
				'page-id', // pageId
				'https://contributions.local', // contributionsServiceUrl
				'UK', // editionId
				'Article', // contentType (must be a valid content type)
				'section', // sectionId
				[], // tags
				() => 0, // retrieveDismissedCount
			);

			expect(result).toEqual({ show: true, meta: auxiaReturn });
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

			const result = await canShowSignInGatePortal(
				undefined,
				false,
				false,
				'page-id',
				'https://contributions.local',
				'UK',
				'Article',
				'section',
				[],
				() => 0,
			);

			expect(result).toEqual({ show: true, meta: auxiaReturn });
		});
	});
});
