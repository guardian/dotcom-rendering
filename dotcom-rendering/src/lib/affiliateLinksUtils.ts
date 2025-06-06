/** A function to check if a URL represents an affiliate link */
export const isSkimlink = (url?: string): boolean => {
	try {
		return !!url && new URL(url).host === 'go.skimresources.com';
	} catch (err: unknown) {
		// If not a valid URL, it won't be an affiliate link
		return false;
	}
};
