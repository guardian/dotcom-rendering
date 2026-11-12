import type { ConfigType } from '../types/config';

/**
 * The v1/v2 tiers of the Puzzles & Games rollout, layered cumulatively (see
 * the JSDoc comments in `ab-testing/config/abTests.ts` for what each tier
 * gates on the product side).
 *
 * Each tier is a genuinely separate AB test entry, but a later tier is only
 * meaningful in combination with every tier below it: `puzzles-new-hub-v2`
 * does nothing unless `puzzles-new-hub-v1` is also enabled, and
 * `puzzles-new-hub-v3` does nothing unless both v1 and v2 are. This prevents an
 * inconsistent state and means each tier can be rolled back independently
 * (flip just that tier's `audienceSize`/`status` in `abTests.ts`).
 */
export const puzzlesHubV1Experiment = {
	name: 'puzzles-new-hub-v1',
	variant: 'variant',
	control: 'control',
} as const;

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

type PuzzlesVersionExperimentConfig = Pick<ConfigType, 'serverSideABTests'>;

const isInVariant = (
	{ serverSideABTests }: PuzzlesVersionExperimentConfig,
	testName: string,
	variant: string,
): boolean =>
	serverSideABTests[testName] === variant ||
	process.env.NODE_ENV === 'development';

/**
 * True when `puzzles-new-hub-v1` is in its `variant` group for this request
 * (or in local development).
 */
export const isPuzzlesHubV1Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isInVariant(
		config,
		puzzlesHubV1Experiment.name,
		puzzlesHubV1Experiment.variant,
	);

/**
 * True only when BOTH `puzzles-new-hub-v1` and `puzzles-new-hub-v2` are in
 * their `variant` group for this request. Either being off is enough to keep
 * v2 features hidden - see the cumulative design note above.
 */
export const isPuzzlesHubV2Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isPuzzlesHubV1Enabled(config) &&
	isInVariant(
		config,
		puzzlesHubV2Experiment.name,
		puzzlesHubV2Experiment.variant,
	);

/**
 * True only when `puzzles-new-hub-v1`, `puzzles-new-hub-v2` AND
 * `puzzles-new-hub-v3` are all in their `variant` group for this request: the
 * premium puzzles access control (the unlock modal and everything that depends
 * on it). Any of them being off is enough to make every puzzle behave as a free
 * one - see the cumulative design note above.
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

export const puzzlesHubV1Participation = (
	group: string,
): Record<string, string> => ({
	[puzzlesHubV1Experiment.name]: group,
});

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
