import type { Participations } from '@guardian/ab-core';
import { storage } from '@guardian/libs';

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
