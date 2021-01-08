import { Design } from '@guardian/types/Format';

export const decideLineEffect = (
	design: Design,
	pillar: CAPIPillar,
): LineEffectType => {
	if (pillar === 'sport') {
		return 'dotted';
	}

	switch (design) {
		case Design.Feature:
		case Design.Recipe:
			return 'squiggly';
		case Design.Comment:
		case Design.GuardianView:
		case Design.Review:
		case Design.Interview:
		case Design.Live:
		case Design.Media:
		case Design.PhotoEssay:
		case Design.Analysis:
		case Design.Article:
		case Design.MatchReport:
		case Design.Quiz:
		case Design.AdvertisementFeature:
		default:
			return 'straight';
	}
};

export const decideLineCount = (design?: Design): 8 | 4 => {
	if (design === Design.Comment) {
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
