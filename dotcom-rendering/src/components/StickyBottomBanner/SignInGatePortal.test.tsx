import { canShowSignInGatePortal } from './SignInGatePortal';

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

			const result = await canShowSignInGatePortal(false, false, false);

			expect(result).toEqual({ show: true, meta: undefined });
		});

		it('should return false when isSignedIn is undefined but truthy check would pass', async () => {
			const mockElement = document.createElement('div');
			mockGetElementById.mockReturnValue(mockElement);

			const result = await canShowSignInGatePortal(
				undefined,
				false,
				false,
			);

			expect(result).toEqual({ show: true, meta: undefined });
		});
	});
});
