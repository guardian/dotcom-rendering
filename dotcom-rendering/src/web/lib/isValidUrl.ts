/** Checks if a given URL is valid */
export const isValidUrl = (maybeUrl: string): boolean => {
	try {
		new URL(maybeUrl);
		return true;
	} catch (e) {
		return false;
	}
};
