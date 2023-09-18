import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { EditionId } from './edition';
import type { AdvertisingRegion } from './real-time-config.amp';

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
		/* TODO add Europe */
	`,
	INT: css`
		display: none;
		/* TODO add Europe */
		:not(.amp-iso-country-gb, .amp-iso-country-us, .amp-iso-country-au) & {
			display: block;
		}
	`,
};
