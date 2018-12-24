import { pillarNames } from '@frontend/lib/pillars';

export const findPillar: (name: string) => Pillar | undefined = name => {
    const pillar: string = name.toLowerCase();
    // The pillar name is "arts" in CAPI, but "culture" everywhere else,
    // therefore we perform this substitution here.
    if (pillar === 'arts') {
        return 'culture';
    }
    return pillarNames.find(_ => _ === pillar);
};
