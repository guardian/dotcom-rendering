import type { ConfigType } from '../types/config';
import {
	PUZZLES_HUB_EXPERIMENT,
	PUZZLES_HUB_VARIANT,
} from './puzzlesHubExperiment';

/**
 * The v1/v2 tiers of the Puzzles & Games rollout, layered cumulatively on
 * top of the `puzzles-new-hub` (v0) baseline defined alongside it in
 * `ab-testing/config/abTests.ts` (see the JSDoc comments there for what
 * each tier actually gates on the product side).
 *
 * Each tier is a genuinely separate AB test entry, but is only meaningful
 * in combination with the tier(s) below it: `puzzles-new-hub-v1` does
 * nothing unless `puzzles-new-hub` (v0) is also enabled, and
 * `puzzles-new-hub-v2` does nothing unless BOTH `puzzles-new-hub` and
 * `puzzles-new-hub-v1` are also enabled. This is deliberate - it prevents
 * an inconsistent state (e.g. a later tier's features appearing while the
 * baseline they build on is switched off), and means each tier can be
 * rolled back independently (flip just that tier's `audienceSize`/`status`
 * in `abTests.ts`) without touching the tiers below it.
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

type PuzzlesVersionExperimentConfig = Pick<ConfigType, 'serverSideABTests'>;

const isInVariant = (
	{ serverSideABTests }: PuzzlesVersionExperimentConfig,
	testName: string,
	variant: string,
): boolean => serverSideABTests[testName] === variant;

/**
 * True only when BOTH `puzzles-new-hub` (v0) AND `puzzles-new-hub-v1` are
 * in their `variant` group for this request. `puzzles-new-hub-v1` being in
 * `variant` on its own, with v0 off, is NOT enough - see the cumulative
 * design note above.
 */
export const isPuzzlesHubV1Enabled = (
	config: PuzzlesVersionExperimentConfig,
): boolean =>
	isInVariant(config, PUZZLES_HUB_EXPERIMENT, PUZZLES_HUB_VARIANT) &&
	isInVariant(
		config,
		puzzlesHubV1Experiment.name,
		puzzlesHubV1Experiment.variant,
	);

/**
 * True only when `puzzles-new-hub` (v0), `puzzles-new-hub-v1`, AND
 * `puzzles-new-hub-v2` are ALL in their `variant` group for this request.
 * Any one of the three being off is enough to keep v2 features hidden -
 * see the cumulative design note above.
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
