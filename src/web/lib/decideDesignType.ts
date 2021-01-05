export const decideDesignType = (
	designType: DesignType | 'Immersive' | 'SpecialReport' | 'GuardianLabs',
): DesignType => {
	if (designType === 'Immersive') return 'Article';
	if (designType === 'SpecialReport') return 'Article';
	if (designType === 'GuardianLabs') return 'AdvertisementFeature';
	return designType;
};
