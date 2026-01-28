import { error, ok, type Result } from './result';

export const parseIntResult = (int: string): Result<string, number> => {
	const parsed = parseInt(int);

	if (isNaN(parsed)) {
		return error(`${int} isn't a valid integer`);
	}

	return ok(parsed);
};

export const parseDate = (a: string): Result<string, Date> => {
	const d = new Date(a);

	if (d.toString() === 'Invalid Date') {
		return error(`${String(a)} isn't a valid Date`);
	}

	return ok(d);
};

export type Parser<E, A, B> = (a: A) => Result<E, B>;

export const oneOf =
	<E, A, B>(parsers: [Parser<E, A, B>, ...Array<Parser<E, A, B>>]) =>
	(input: A): Result<E[], B> => {
		const f = (
			remainingParsers: Array<Parser<E, A, B>>,
			errs: E[],
		): Result<E[], B> => {
			const [head, ...tail] = remainingParsers;

			if (head === undefined) {
				return error(errs);
			}

			const result = head(input);

			if (!result.ok) {
				return f(tail, [...errs, result.error]);
			}

			return ok(result.value);
		};

		return f(parsers, []);
	};
