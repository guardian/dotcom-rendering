import type { Participations, Runnable } from '@guardian/ab-core';
import { isObject, isString } from '@guardian/libs';

const isParticipations = (
	participations: unknown,
): participations is Participations =>
	isObject(participations) &&
	Object.values(participations).every(
		(participation) =>
			isObject(participation) && isString(participation.variant),
	);

const runnableTestsToParticipations = (
	runnableTests: readonly Runnable[],
): Participations =>
	runnableTests.reduce(
		(participations: Participations, { id: testId, variantToRun }) => ({
			...participations,
			...{
				[testId]: {
					variant: variantToRun.id,
				},
			},
		}),
		{},
	);

export { isParticipations, runnableTestsToParticipations };
