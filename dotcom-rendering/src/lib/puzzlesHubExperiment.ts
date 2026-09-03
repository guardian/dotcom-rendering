import type { ConfigType } from '../types/config';

export const puzzlesHubExperiment = {
	name: 'puzzles-new-hub',
	variant: 'variant',
	control: 'control',
} as const;

type PuzzlesExperimentConfig = Pick<ConfigType, 'serverSideABTests'>;

export const isPuzzlesHubEnabled = ({
	serverSideABTests,
}: PuzzlesExperimentConfig): boolean =>
	serverSideABTests[puzzlesHubExperiment.name] ===
	puzzlesHubExperiment.variant;

export const puzzlesHubParticipation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubExperiment.name]: group,
});
