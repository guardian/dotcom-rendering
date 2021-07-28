import { css } from '@emotion/react';

/**
 * Class that will display an element if the user accesses the AMP page
 * from Great Britain
 */
const ukRegionClass = css`
	display: none;
	.amp-iso-country-gb & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page from US
 */
const usRegionClass = css`
	display: none;
	.amp-iso-country-us & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page
 * from Australia
 */
const auRegionClass = css`
	display: none;
	.amp-iso-country-au & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page from
 * the region denoted as "Rest of World"
 *
 * Currently this region is set to any access either from the European Economic
 * Area or where no AMP geo group is assigned
 *
 */
const rowRegionClass = css`
	display: none;
	.amp-geo-group-eea & {
		display: block;
	}
	.amp-geo-no-group & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page from
 * the region denoted as "International"
 *
 * Currently this region is set to any access from the European Economic
 * Area EXCEPT Great Britain or where no AMP geo group is assigned
 */
const internationalRegionClass = css`
	display: none;
	.amp-geo-group-eea:not(.amp-iso-country-gb) &,
	.amp-geo-no-group & {
		display: block;
	}
`;

/** Dictionary mapping region code to the associated AMP region style */
export const regionClasses = {
	UK: ukRegionClass,
	US: usRegionClass,
	AU: auRegionClass,
	INT: internationalRegionClass,
	ROW: rowRegionClass,
};
