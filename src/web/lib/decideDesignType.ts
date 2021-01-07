export const decideDesignType = (designType: CAPIDesign): Design => {
	if (designType === 'Immersive') return 'Article';
	if (designType === 'SpecialReport') return 'Article';
	if (designType === 'GuardianLabs') return 'AdvertisementFeature';
	return designType;
};
