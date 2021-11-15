export const buildAdTargeting = ({
	isAdFreeUser,
	isSensitive,
	edition,
	section,
	sharedAdTargeting,
	adUnit,
	videoDuration,
}: {
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: Record<string, unknown>;
	adUnit: string;
	videoDuration?: number;
}): AdTargeting => {
	if (isAdFreeUser) {
		return {
			disableAds: true,
		};
	}
	const customParams = {
		sens: isSensitive ? 't' : 'f',
		si: 'f',
		vl: videoDuration || 0,
		cc: edition,
		s: section,
		inskin: 'f',
		...sharedAdTargeting,
		pa: 'f',
	};
	return {
		customParams,
		adUnit,
	};
};
