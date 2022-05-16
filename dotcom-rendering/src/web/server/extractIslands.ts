const regex = new RegExp(
	// Gets the name of any island where expediteLoading is set to 'true'
	// e.g <gu-island name="MyComponent" props="..." expediteLoading="true"></gu-island>
	/<gu-island name="([a-zA-Z]+)"[^>]*expediteLoading="true"[^>]*><\/gu-island>/g,
);

// https://stackoverflow.com/a/9229821/17210412
const unique = (arr: string[]): string[] => {
	return [...new Set(arr)];
};

export const extractExpeditedIslands = (html: string): string[] => {
	const matches = html.matchAll(regex);

	return unique(
		Array.from(matches).map((match) => {
			// MyComponent.importable becomes MyComponent-importable during the build
			return `${match[1]}-importable`;
		}),
	);
};
