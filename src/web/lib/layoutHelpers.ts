export const decideLineEffect = (
	design: Design,
	pillar: CAPIPillar,
): LineEffectType => {
	if (pillar === 'sport') {
		return 'dotted';
	}

	switch (design) {
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
		case 'Quiz':
		case 'AdvertisementFeature':
		default:
			return 'straight';
	}
};

export const decideLineCount = (design?: Design): 8 | 4 => {
	if (design === 'Comment') {
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
