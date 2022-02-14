import type { Configuration } from 'webpack';

export const isWebpackConfiguration = (
	c: false | Configuration,
): c is Configuration => c !== false;
