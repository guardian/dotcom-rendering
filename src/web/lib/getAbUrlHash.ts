import { Variant } from '@guardian/ab-core';

export type Participations = { testId: { variant: Variant } };

export const getForcedParticipationsFromUrl = (
    windowHash: string,
): Participations | undefined => {
    if (windowHash.startsWith('#ab')) {
        const tokens = windowHash.replace('#ab-', '').split(',');
        return tokens.reduce((obj, token) => {
            const [testId, variantId] = token.split('=');
            return {
                ...obj,
                [testId]: { variant: variantId },
            };
        }, {} as Participations);
    }

    return undefined;
};
