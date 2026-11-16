import type { ConfigType } from '../types/config';
import { isPuzzlesHubAvailable } from './puzzlesHubAccess';

/**
 * The v2/v3 tiers of the Puzzles & Games rollout, layered on top of the hub's
 * edition gate (see `isPuzzlesHubAvailable`, which replaced the former
 * `puzzles-new-hub-v1` AB test).
 *
 * Each tier is a genuinely separate AB test entry, but a later tier is only
 * meaningful in combination with everything below it: `puzzles-new-hub-v2`
 * does nothing outside the editions the hub is rolled out to, and
 * `puzzles-new-hub-v3` does nothing unless v2 is also enabled. This prevents an
 * inconsistent state and means each tier can be rolled back independently
 * (flip just that tier's `audienceSize`/`status` in `abTests.ts`).
 */
export const puzzlesHubV2Experiment = {
	name: 'puzzles-new-hub-v2',
	variant: 'variant',
	control: 'control',
} as const;

export const puzzlesHubV3Experiment = {
	name: 'puzzles-new-hub-v3',
	variant: 'variant',
	control: 'control',
} as const;

type PuzzlesVersionExperimentConfig = Pick<
	ConfigType,
	'serverSideABTests' | 'edition'
>;

const isInVariant = (
	{ serverSideABTests }: PuzzlesVersionExperimentConfig,
	testName: string,
	variant: string,
): boolean =>
	serverSideABTests[testName] === variant ||
	process.env.NODE_ENV === 'development';

/**
 * True only when the hub is available for this request's edition AND
 * `puzzles-new-hub-v2` is in its `variant` group (or in local development).
 */
export const isPuzzlesHubV2Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubAvailable(config) &&
	isInVariant(
		config,
		puzzlesHubV2Experiment.name,
		puzzlesHubV2Experiment.variant,
	);

/**
 * True only when the hub is available for this request's edition, AND
 * `puzzles-new-hub-v2` AND `puzzles-new-hub-v3` are in their `variant` group:
 * the premium puzzles access control (the unlock modal and everything that
 * depends on it). Any of them being off is enough to make every puzzle behave
 * as a free one - see the layered design note above.
 */
export const isPuzzlesHubV3Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubV2Enabled(config) &&
	isInVariant(
		config,
		puzzlesHubV3Experiment.name,
		puzzlesHubV3Experiment.variant,
	);

export const puzzlesHubV2Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV2Experiment.name]: group,
});

export const puzzlesHubV3Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV3Experiment.name]: group,
});
