import type { ConfigType } from '../types/config';

export const puzzlesHubV3Experiment = {
	name: 'puzzles-new-hub-v3',
	variant: 'variant',
	control: 'control',
} as const;

type PuzzlesVersionExperimentConfig = Pick<ConfigType, 'serverSideABTests'>;

/** Premium puzzles access control. Always on in local development. */
export const isPuzzlesHubV3Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	config.serverSideABTests[puzzlesHubV3Experiment.name] ===
		puzzlesHubV3Experiment.variant ||
	process.env.NODE_ENV === 'development';

export const puzzlesHubV3Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV3Experiment.name]: group,
});

export const puzzlesHubV4Experiment = {
	name: 'puzzles-new-hub-v4',
	variant: 'variant',
	control: 'control',
} as const;

/** Maxi crossword. Needs V3 and its own variant. Always on in local development. */
export const isPuzzlesHubV4Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubV3Enabled(config) &&
	(config.serverSideABTests[puzzlesHubV4Experiment.name] ===
		puzzlesHubV4Experiment.variant ||
		process.env.NODE_ENV === 'development');
