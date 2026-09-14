import type { ConfigType } from '../types/config';

export const PUZZLES_HUB_EXPERIMENT = 'puzzles-new-hub';
export const PUZZLES_HUB_VARIANT = 'variant';

export const isPuzzlesHubVariant = (
	serverSideABTests: ConfigType['serverSideABTests'] | undefined,
): boolean =>
	serverSideABTests?.[PUZZLES_HUB_EXPERIMENT] === PUZZLES_HUB_VARIANT;

export const isPuzzlesHubEnabled = (
	serverSideABTests: ConfigType['serverSideABTests'] | undefined,
	isDevelopment = process.env.NODE_ENV === 'development',
): boolean => isDevelopment || isPuzzlesHubVariant(serverSideABTests);
