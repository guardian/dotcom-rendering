import { css } from '@emotion/react';

const ukRegionClass = css`
	.amp-iso-country-gb & {
		display: block;
	}
`;

const usRegionClass = css`
	.amp-iso-country-us & {
		display: block;
	}
`;

const auRegionClass = css`
	.amp-iso-country-au & {
		display: block;
	}
`;

const rowRegionClass = css`
	.amp-geo-group-eea & {
		display: block;
	}
	.amp-geo-no-group & {
		display: block;
	}
`;

const internationalRegionClass = css`
	.amp-geo-group-eea:not(.amp-iso-country-gb) &,
	.amp-geo-no-group & {
		display: block;
	}
`;

export const noDisplayClass = css`
	display: none;
`;

export const regionClasses = {
	UK: ukRegionClass,
	US: usRegionClass,
	AU: auRegionClass,
	INT: internationalRegionClass,
	ROW: rowRegionClass,
};
