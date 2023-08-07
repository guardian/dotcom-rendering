const constructQuery = (query: {
	[key: string]:
		| string
		| string[]
		| number
		| number[]
		| boolean
		| boolean[]
		| undefined;
}): string =>
	Object.keys(query)
		.map((param: string) => {
			const value = query[param] ?? 'undefined';
			const queryValue = Array.isArray(value)
				? value.map((v) => encodeURIComponent(v)).join(',')
				: encodeURIComponent(value);
			return `${param}=${queryValue}`;
		})
		.join('&');

export { constructQuery };
