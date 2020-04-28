export const decideLineEffect = (
    designType: DesignType,
    pillar: Pillar,
): LineEffectType => {
    if (pillar === 'sport') {
        return 'dotted';
    }
    if (designType === 'Comment') {
        return 'straight';
    }
    if (designType === 'Feature' || designType === 'Recipe') {
        return 'squiggly';
    }
    return 'straight';
};

export const decideLineCount = (designType?: DesignType): 8 | 4 => {
    if (designType === 'Comment') {
        return 8;
    }
    return 4;
};

export const getCurrentPillar = (CAPI: CAPIType): Pillar => {
    return (
        (CAPI.nav.currentPillar &&
            CAPI.nav.currentPillar.title.toLowerCase()) ||
        CAPI.pillar
    );
};
