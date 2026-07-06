import {
	getErrorType,
	getResponseFailureDetails,
} from './newsletterSignupFailureDetails';

const mockResponse = (
	text: string,
	additionalHeaders: Record<string, string> = {},
): Response =>
	({
		text: jest.fn().mockResolvedValue(text),
		headers: {
			get: jest
				.fn()
				.mockImplementation(
					(headerName: string) =>
						additionalHeaders[headerName.toLowerCase()] ?? null,
				),
		},
	}) as unknown as Response;

describe('newsletterSignupFailureDetails', () => {
	describe('getResponseFailureDetails', () => {
		it('returns undefined for an empty response body', async () => {
			const response = mockResponse('   ', {
				'content-type': 'text/plain',
			});

			await expect(getResponseFailureDetails(response)).resolves.toEqual(
				{},
			);
		});

		it('trims and collapses whitespace in the response body', async () => {
			const response = mockResponse('  too\n\n many\t spaces  ', {
				'content-type': 'text/plain',
			});

			await expect(getResponseFailureDetails(response)).resolves.toEqual({
				errorDescription: 'too many spaces',
			});
		});

		it('truncates the response body to 60 characters', async () => {
			const longMessage = 'a'.repeat(70);
			const response = mockResponse(longMessage, {
				'content-type': 'text/plain',
			});

			await expect(getResponseFailureDetails(response)).resolves.toEqual({
				errorDescription: 'a'.repeat(60),
			});
		});

		it('returns the error code header when present', async () => {
			const response = mockResponse('ignored body', {
				'content-type': 'text/plain',
				'email-signup-error-code': 'already-subscribed',
			});

			await expect(getResponseFailureDetails(response)).resolves.toEqual({
				errorCode: 'already-subscribed',
			});
			expect(response.text).not.toHaveBeenCalled();
		});

		it('returns undefined for html error pages based on content type', async () => {
			const response = mockResponse(
				'<!DOCTYPE html><html><head><title>Error</title></head><body>Oops</body></html>',
				{ 'content-type': 'text/html; charset=utf-8' },
			);

			await expect(getResponseFailureDetails(response)).resolves.toEqual(
				{},
			);
		});

		it('returns undefined when reading the response body throws', async () => {
			const response = {
				text: jest.fn().mockRejectedValue(new Error('read failed')),
				headers: {
					get: jest
						.fn()
						.mockImplementation((headerName: string) =>
							headerName.toLowerCase() === 'content-type'
								? 'text/plain'
								: null,
						),
				},
			} as unknown as Response;

			await expect(getResponseFailureDetails(response)).resolves.toEqual(
				{},
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
