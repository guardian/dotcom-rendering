// isDevelopment and isTest are safe to use client side because
// process.env.NODE_ENV is replaced by rollup
export const isDevelopment = (): boolean =>
	process.env.NODE_ENV === 'development';
export const isTest = (): boolean => process.env.NODE_ENV === 'test';

// isStorybook is safe to use client side because we attempt to determine if
// process is defined before using
export const isStorybook = (): boolean => {
	if (typeof process === 'object') {
		return process.env.STORYBOOK === 'true';
	}

	return false;
};
