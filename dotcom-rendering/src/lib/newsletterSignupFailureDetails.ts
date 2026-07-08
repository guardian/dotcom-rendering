export const getResponseErrorDescription = async (
	response: Response,
): Promise<string | undefined> => {
	try {
		const responseText = (await response.text()).trim();
		if (!responseText) return;
		return responseText.replace(/\s+/g, ' ').substring(0, 120);
	} catch {
		return;
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
