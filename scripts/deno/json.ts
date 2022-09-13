export const fetchJSON = async <T>(
	url: Parameters<typeof fetch>[0],
	{
		headers,
		parser,
	}: {
		headers?: HeadersInit;
		parser: (data: unknown) => T | Promise<T>;
	},
): Promise<T> => {
	const data: unknown = await fetch(url, { headers }).then((r) => r.json());
	return parser(data);
};
