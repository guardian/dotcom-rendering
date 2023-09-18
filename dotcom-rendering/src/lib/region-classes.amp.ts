import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { EditionId } from './edition';
import type { AdvertisingRegion } from './real-time-config.amp';

/**
 * Classes for only displaying an ad slot in specific geographic regions
 *
 * These can be used to create ads that contain configuration (placement ids,
 * zone ids) that only pertains to a certain region. By creating 4 ad with
 * each of these classes applied, only one will appear for each slot on any
 * given pageview, depending on the geo.
 *
 * See https://amp.dev/documentation/components/amp-geo
 */
export const advertisingRegionClasses: {
	[region in AdvertisingRegion]: SerializedStyles;
} = {
	UK: css`
		display: none;
		.amp-iso-country-gb & {
			display: block;
		}
	`,
	US: css`
		display: none;
		.amp-iso-country-us & {
			display: block;
		}
	`,
	AU: css`
		display: none;
		.amp-iso-country-au & {
			display: block;
		}
	`,
	ROW: css`
		display: none;
		:not(.amp-iso-country-gb, .amp-iso-country-us, .amp-iso-country-au) & {
			display: block;
		}
	`,
};

/**
 * Classes for only displaying per-edition branding in specific geographic regions
 *
 * See https://amp.dev/documentation/components/amp-geo
 */
export const editionRegionClasses: {
	[editionId in EditionId]: SerializedStyles;
} = {
	UK: css`
		display: none;
		.amp-iso-country-gb & {
			display: block;
		}
	`,
	US: css`
		display: none;
		.amp-iso-country-us & {
			display: block;
		}
	`,
	AU: css`
		display: none;
		.amp-iso-country-au & {
			display: block;
		}
	`,
	EUR: css`
		display: none;
		/* We define this group ourselves in an <amp-geo> element */
		.amp-geo-group-eur & {
			display: block;
		}
	`,
	INT: css`
		display: none;
		:not(
				.amp-iso-country-gb,
				.amp-iso-country-us,
				.amp-iso-country-au,
				.amp-geo-group-eur
			)
			& {
			display: block;
		}
	`,
};
