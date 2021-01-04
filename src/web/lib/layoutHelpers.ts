export const decideLineEffect = (
	designType: DesignType,
	pillar: CAPIPillar,
): LineEffectType => {
	if (pillar === 'sport') {
		return 'dotted';
	}

	switch (designType) {
		case 'Feature':
		case 'Recipe':
			return 'squiggly';
		case 'Comment':
		case 'GuardianView':
		case 'Review':
		case 'Interview':
		case 'Live':
		case 'Media':
		case 'PhotoEssay':
		case 'Analysis':
		case 'Article':
		case 'MatchReport':
		case 'GuardianLabs':
		case 'Quiz':
		case 'AdvertisementFeature':
		default:
			return 'straight';
	}
};

export const decideLineCount = (designType?: DesignType): 8 | 4 => {
	if (designType === 'Comment') {
		return 8;
	}
	return 4;
};

export const getCurrentPillar = (CAPI: CAPIType): CAPIPillar => {
	return (
		(CAPI.nav.currentPillar &&
			CAPI.nav.currentPillar.title.toLowerCase()) ||
		CAPI.pillar
	);
};
