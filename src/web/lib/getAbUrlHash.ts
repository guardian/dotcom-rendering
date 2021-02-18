import { Participations } from '@guardian/ab-core';

export const getForcedParticipationsFromUrl = (
	windowHash: string,
): Participations => {
	if (windowHash.startsWith('#ab')) {
		const tokens = windowHash.replace('#ab-', '').split(',');
		return tokens.reduce((obj, token) => {
			const [testId, variantId] = token.split('=');

			if (testId && variantId) {
				return {
					...obj,
					[testId]: { variant: variantId },
				};
			}

			return obj;
		}, {} as Participations);
	}

	return {};
};
