export const safeJsonParse =
	<T>(guard: (o: unknown) => o is T) =>
	(text: string): ParseResult<T> => {
		try {
			const parsed = JSON.parse(text) as unknown;
			return guard(parsed)
				? { parsed, hasError: false }
				: { hasError: true };
		} catch (_) {
			return { hasError: true };
		}
	};

type ParseResult<T> =
	| { parsed: T; hasError: false }
	| { parsed?: undefined; hasError: true };
