import { Design, Pillar } from '@guardian/types';
import { decidePillar } from './decidePillar';

export const decideLineEffect = (
	design: Design,
	pillar: Theme,
): LineEffectType => {
	if (pillar === Pillar.Sport) {
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

export const getCurrentPillar = (CAPI: CAPIType): Theme => {
	const currentPillar =
		(CAPI.nav.currentPillar &&
			CAPI.nav.currentPillar.title.toLowerCase()) ||
		CAPI.pillar;
	return decidePillar({ pillar: currentPillar });
};
