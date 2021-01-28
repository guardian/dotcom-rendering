export const joinUrl = (parts: string[]) => {
	// Remove any leading or trailing slashes from all parts and then join cleanly on
	// a single slash - prevents malformed urls
	const trimmed = parts
		.map((part) => {
			// Trim left
			if (part.substr(0, 1) === '/') return part.slice(1);
			return part;
		})
		.map((part) => {
			// Trim right
			if (part.substr(part.length - 1, 1) === '/')
				return part.slice(0, -1);
			return part;
		});

	return trimmed.join('/');
};
