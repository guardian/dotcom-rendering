export const decidePillar = ({
	pillar,
	design,
}: {
	pillar: CAPIPillar;
	design: Design;
}): CAPIPillar => {
	// We override the pillar to be opinion on Comment news pieces
	if (design === 'Comment' && pillar === 'news') return 'opinion';
	return pillar;
};
