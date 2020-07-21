import { Variant } from '@guardian/ab-core';

type Participations = { testId: string; variant: Variant };

export const getForcedParticipationsFromUrl = (
    windowHash: string,
): Participations => {
    if (windowHash.startsWith('#ab')) {
        const tokens = windowHash.replace('#ab-', '').split(',');
        return tokens.reduce((obj, token) => {
            const [testId, variantId] = token.split('=');
            return {
                ...obj,
                [testId]: { variant: variantId },
            };
        }, {});
    }

    return {};
};
