import type { Participations } from '@guardian/ab-core';

export const getForcedParticipationsFromUrl = (
	windowHash: string,
): Participations => {
	if (windowHash.startsWith('#ab')) {
		const tokens = windowHash.replace('#ab-', '').split(',');
		return tokens.reduce<Participations>((obj, token) => {
			const [testId, variantId] = token.split('=');

			if (testId && variantId) {
				return {
					...obj,
					[testId]: { variant: variantId },
				};
			}

			return obj;
		}, {});
	}

	return {};
};

export const getForcedParticipationsFromUrlFlat = (
	windowHash: string,
): Record<string, string> => {
	if (windowHash.startsWith('#ab')) {
		const tokens = windowHash
			.replace('#ab-', '')
			.split(',')
			.map((token) => token.replace(/^ab-/, ''));
		return tokens.reduce<Record<string, string>>((obj, token) => {
			const [testId, variantId] = token.split('=');

			if (testId && variantId) {
				return {
					...obj,
					[testId]: variantId,
				};
			}

			return obj;
		}, {});
	}

	return {};
};
