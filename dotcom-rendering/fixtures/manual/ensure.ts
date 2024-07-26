import { isUndefined } from '@guardian/libs';

export function ensure<T>(
	argument: T | undefined | null,
	message = 'This value was promised to be there.',
): T {
	if (isUndefined(argument) || argument === null) {
		throw new TypeError(message);
	}

	return argument;
}
