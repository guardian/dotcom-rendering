export const decideLineEffect = (
    designType: DesignType,
    pillar: Pillar,
): LineEffectType => {
    if (designType === 'Comment') {
        return 'straight';
    }
    if (designType === 'Feature') {
        return 'squiggly';
    }
    if (pillar === 'sport') {
        return 'dotted';
    }
    return 'straight';
};

export const decideLineCount = (designType?: DesignType): 8 | 4 => {
    if (designType === 'Comment') {
        return 8;
    }
    return 4;
};
