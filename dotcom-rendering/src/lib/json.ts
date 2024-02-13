import { error, ok, type Result } from './result';

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
		return ok(await response.json());
	} catch (err) {
		if (err instanceof SyntaxError) {
			return error('ApiError');
		}

		return error('NetworkError');
	}
};
