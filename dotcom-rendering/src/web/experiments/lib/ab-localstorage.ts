import type { Participations } from '@guardian/ab-core';
import { storage } from '@guardian/libs';
import { isParticipations } from './ab-participations';

/**
 * These utils have been lifted from the equivalent Frontend file
 * https://github.com/guardian/frontend/blob/18f5d8aa4a4191f4efb58b37dc39685860369e04/static/src/javascripts/projects/common/modules/experiments/ab-local-storage.ts
 */

const participationsKey = 'gu.ab._participations';

// -------
// Reading
// -------

export const getParticipationsFromLocalStorage = (): Participations => {
	const participations = storage.local.get(participationsKey);
	return isParticipations(participations) ? participations : {};
};

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
