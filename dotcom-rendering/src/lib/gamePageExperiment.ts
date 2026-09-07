import type { ConfigType } from '../types/config';

export const gamePageExperiment = {
	name: 'game-page-experiment',
	variant: 'variant',
	control: 'control',
} as const;

type GamePageExperimentConfig = Pick<ConfigType, 'serverSideABTests'>;

export const isGamePageEnabled = ({
	serverSideABTests,
}: GamePageExperimentConfig): boolean =>
	serverSideABTests[gamePageExperiment.name] === gamePageExperiment.variant;

export const gamePageParticipation = (
	group: string,
): Record<string, string> => ({
	[gamePageExperiment.name]: group,
});
