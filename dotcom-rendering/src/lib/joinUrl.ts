export const joinUrl = (parts: string[]): string => {
	// Remove any leading or trailing slashes from all parts and then join cleanly on
	// a single slash - prevents malformed urls
	const trimmed = parts
		.map((part) => {
			// Trim left
			if (part.startsWith('/')) return part.slice(1);
			return part;
		})
		.map((part) => {
			// Trim right
			if (part.endsWith('/')) return part.slice(0, -1);
			return part;
		});

	return trimmed.join('/');
};
