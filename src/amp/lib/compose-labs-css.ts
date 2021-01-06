import { cx } from 'emotion';

export const composeLabsCSS = (
	designType: DesignType,
	baseCSS: string,
	labsCSS: string,
): string =>
	designType === 'AdvertisementFeature' ? cx(baseCSS, labsCSS) : baseCSS;
