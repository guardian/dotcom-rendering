const constructQuery = (query: { [key: string]: any }): string =>
	new URLSearchParams(query).toString();

export { constructQuery };
