import type { ConfigType } from '../types/config';
import { isPuzzlesHubAvailable } from './puzzlesHubAccess';

export const puzzlesHubV3Experiment = {
	name: 'puzzles-new-hub-v3',
	variant: 'variant',
	control: 'control',
} as const;

type PuzzlesVersionExperimentConfig = Pick<
	ConfigType,
	'serverSideABTests' | 'edition'
>;

/** Premium access is gated separately from the permanently available trivia games. */
export const isPuzzlesHubV3Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubAvailable(config) &&
	(config.serverSideABTests[puzzlesHubV3Experiment.name] ===
		puzzlesHubV3Experiment.variant ||
		process.env.NODE_ENV === 'development');

export const puzzlesHubV3Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV3Experiment.name]: group,
});
