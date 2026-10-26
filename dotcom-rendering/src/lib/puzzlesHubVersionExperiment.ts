import type { ConfigType } from '../types/config';
import { isPuzzlesHubAvailable } from './puzzlesHubAccess';

/**
 * The v2 tier of the Puzzles & Games rollout, layered on top of the hub's
 * edition gate (see `isPuzzlesHubAvailable`, which replaced the former
 * `puzzles-new-hub-v1` AB test).
 *
 * `puzzles-new-hub-v2` is a genuinely separate AB test entry, but it is only
 * meaningful in combination with the hub being available: it does nothing
 * outside the editions the hub is rolled out to. This prevents an
 * inconsistent state and means v2 can be rolled back independently (flip just
 * its `audienceSize`/`status` in `abTests.ts`).
 */
export const puzzlesHubV2Experiment = {
	name: 'puzzles-new-hub-v2',
	variant: 'variant',
	control: 'control',
} as const;

type PuzzlesVersionExperimentConfig = Pick<
	ConfigType,
	'serverSideABTests' | 'edition'
>;

/**
 * True only when the hub is available for this request's edition AND
 * `puzzles-new-hub-v2` is in its `variant` group (or in local development).
 */
export const isPuzzlesHubV2Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubAvailable(config) &&
	(config.serverSideABTests[puzzlesHubV2Experiment.name] ===
		puzzlesHubV2Experiment.variant ||
		process.env.NODE_ENV === 'development');

export const puzzlesHubV2Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV2Experiment.name]: group,
});
