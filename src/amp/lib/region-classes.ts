import { css } from '@emotion/react';

/**
 * Class that will display an element if the user accesses the AMP page
 * from Great Britain
 */
const ukRegionClass = css`
	.amp-iso-country-gb & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page from US
 */
const usRegionClass = css`
	.amp-iso-country-us & {
		display: block;
	}
`;

/**
 * Class that will display an element if the user accesses the AMP page
 * from Australia
 */
const auRegionClass = css`
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
	.amp-geo-group-eea:not(.amp-iso-country-gb) &,
	.amp-geo-no-group & {
		display: block;
	}
`;

/**
 * Class that can be applied to all regions to ensure that when not in the
 * correct AMP region all other regions aren't displayed
 */
export const noDisplayClass = css`
	display: none;
`;

/** Dictionary mapping region code to the associated AMP region style */
export const regionClasses = {
	UK: ukRegionClass,
	US: usRegionClass,
	AU: auRegionClass,
	INT: internationalRegionClass,
	ROW: rowRegionClass,
};
