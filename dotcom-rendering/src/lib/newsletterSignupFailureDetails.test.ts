import {
	getErrorType,
	getResponseErrorDescription,
} from './newsletterSignupFailureDetails';

const mockResponse = (text: string): Response =>
	({
		text: jest.fn().mockResolvedValue(text),
	}) as unknown as Response;

describe('newsletterSignupFailureDetails', () => {
	describe('getResponseErrorDescription', () => {
		it('returns undefined for an empty response body', async () => {
			const response = mockResponse('   ');

			await expect(getResponseErrorDescription(response)).resolves.toBe(
				undefined,
			);
		});

		it('trims and collapses whitespace in the response body', async () => {
			const response = mockResponse('  too\n\n many\t spaces  ');

			await expect(getResponseErrorDescription(response)).resolves.toBe(
				'too many spaces',
			);
		});

		it('truncates the response body to 120 characters', async () => {
			const longMessage = 'a'.repeat(130);
			const response = mockResponse(longMessage);

			await expect(getResponseErrorDescription(response)).resolves.toBe(
				'a'.repeat(120),
			);
		});

		it('returns undefined when reading the response body throws', async () => {
			const response = {
				text: jest.fn().mockRejectedValue(new Error('read failed')),
			} as unknown as Response;

			await expect(getResponseErrorDescription(response)).resolves.toBe(
				undefined,
			);
		});
	});

	describe('getErrorType', () => {
		it('returns network-or-fetch for TypeError instances', () => {
			expect(getErrorType(new TypeError('Failed to fetch'))).toBe(
				'network-or-fetch',
			);
		});

		it('returns the error name for other Error instances', () => {
			class CustomError extends Error {
				constructor(message: string) {
					super(message);
					this.name = 'CustomError';
				}
			}

			expect(getErrorType(new CustomError('boom'))).toBe('CustomError');
		});

		it('returns unknown for non-Error values', () => {
			expect(getErrorType('boom')).toBe('unknown');
			expect(getErrorType({ message: 'boom' })).toBe('unknown');
		});
	});
});
