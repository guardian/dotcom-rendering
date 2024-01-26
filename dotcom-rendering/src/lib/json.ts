import type { Result } from './result';

/**
 * Safely fetch JSON from a URL.
 *
 * If successful, the value is typed as `unknown`.
 */
export const fetchJSON = async (
	...args: Parameters<typeof fetch>
): Promise<Result<'ApiError' | 'NetworkError', unknown>> => {
	try {
		const response = await fetch(...args);
		return { kind: 'ok', value: await response.json() };
	} catch (error) {
		if (error instanceof SyntaxError) {
			return { kind: 'error', error: 'ApiError' };
		}

		return { kind: 'error', error: 'NetworkError' };
	}
};
