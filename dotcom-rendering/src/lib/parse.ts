import { error, ok, type Result } from './result';

export const parseIntResult = (int: string): Result<string, number> => {
	const parsed = parseInt(int);

	if (isNaN(parsed)) {
		return error(`${int} isn't a valid integer`);
	}

	return ok(parsed);
};
