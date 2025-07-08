/** A function to check if a URL represents an affiliate link */
export const isSkimlink = (url?: string): boolean => {
	try {
		return !!url && new URL(url).host === 'go.skimresources.com';
	} catch (err: unknown) {
		// If not a valid URL, it won't be an affiliate link
		return false;
	}
};

/**  A function to fetch the Skimlinks account ID from the URL to then pass it into the xcust*/
export const getSkimlinksAccountId = (url?: string): string => {
	try {
		if (!url) return '';
		const parsedUrl = new URL(url);
		return parsedUrl.searchParams.get('id') ?? '';
	} catch {
		return '';
	}
};
