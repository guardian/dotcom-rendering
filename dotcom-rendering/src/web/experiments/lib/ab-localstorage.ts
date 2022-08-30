import type { Participations } from '@guardian/ab-core';
import { storage } from '@guardian/libs';

/**
 * These utils have been lifted from the equivalent Frontend file
 * https://github.com/guardian/frontend/blob/18f5d8aa4a4191f4efb58b37dc39685860369e04/static/src/javascripts/projects/common/modules/experiments/ab-local-storage.ts
 */

const participationsKey = 'gu.ab.participations';

// -------
// Reading
// -------
export const getParticipationsFromLocalStorage = (): Participations =>
	(storage.local.get(participationsKey) as Participations | undefined) ?? {};

// -------
// Writing
// -------

// Wipes all localStorage participations
export const clearParticipations = (): void => {
	storage.local.remove(participationsKey);
};

export const setParticipationsInLocalStorage = (
	participations: Participations,
): void => {
	storage.local.set(participationsKey, participations);
};
