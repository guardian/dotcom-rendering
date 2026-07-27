const MAX_FAILURE_DETAIL_LENGTH = 60;
const ERROR_CODE_HEADER = 'Email-Signup-Error-Code';

export type NewsletterSignupFailureDetails = {
	errorCode?: string;
	errorDescription?: string;
};

export const getResponseFailureDetails = async (
	response: Response,
): Promise<NewsletterSignupFailureDetails> => {
	try {
		const errorCode = response.headers
			.get(ERROR_CODE_HEADER)
			?.trim()
			.substring(0, MAX_FAILURE_DETAIL_LENGTH);

		if (errorCode !== undefined && errorCode !== '') {
			return { errorCode };
		}

		const contentType = response.headers.get('content-type')?.toLowerCase();

		if (contentType?.includes('text/html') === true) {
			return {};
		}

		const responseText = (await response.text()).trim();
		if (!responseText) return {};

		const normalisedResponseText = responseText.replace(/\s+/g, ' ');
		return {
			errorDescription: normalisedResponseText.substring(
				0,
				MAX_FAILURE_DETAIL_LENGTH,
			),
		};
	} catch {
		return {};
	}
};

export const getErrorType = (error: unknown): string => {
	if (error instanceof TypeError) {
		return 'network-or-fetch';
	}

	if (error instanceof Error) {
		return error.name || 'error';
	}

	return 'unknown';
};
