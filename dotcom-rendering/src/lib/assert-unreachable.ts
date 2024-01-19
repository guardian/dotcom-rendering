/**
 * A function that asserts it should never be called
 *
 * Useful for checking exhaustiveness of switch cases
 *
 * @see https://tinytip.co/tips/ts-switch-assert-unreachable/
 *
 */
export const assertUnreachable = (): never => {
	throw new Error('This should be unreachable');
};
