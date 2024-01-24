/**
 * A function that asserts it should never be called
 *
 * Useful for checking exhaustiveness of switch cases
 *
 * @see https://tinytip.co/tips/ts-switch-assert-unreachable/
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- We don't actually use the value
export const assertUnreachable = (value: never): never => {
	throw new Error('This should be unreachable');
};
