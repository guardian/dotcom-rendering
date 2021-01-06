export const decidePillar = ({
	pillar,
	design,
}: {
	pillar: CAPIPillar;
	design: DesignType;
}): CAPIPillar => {
	// We override the pillar to be opinion on Comment news pieces
	if (design === 'Comment' && pillar === 'news') return 'opinion';
	if (pillar === 'labs') return 'lifestyle';
	return pillar;
};
