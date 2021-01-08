import { Design } from '@guardian/types/Format';

export const decidePillar = ({
	pillar,
	design,
}: {
	pillar: CAPIPillar;
	design: Design;
}): CAPIPillar => {
	// We override the pillar to be opinion on Comment news pieces
	if (design === Design.Comment && pillar === 'news') return 'opinion';
	return pillar;
};
