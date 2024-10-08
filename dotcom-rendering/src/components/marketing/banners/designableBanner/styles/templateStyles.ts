/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/styles/templateStyles.ts
 */
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';

const templateSpacing = {
	bannerContainer: css`
		margin-bottom: ${space[4]}px;

		${from.tablet} {
			margin-bottom: ${space[3]}px;
		}
	`,
	bannerHeader: css`
		margin: 0;
	`,
	bannerBodyCopy: css`
		margin-bottom: ${space[4]}px;

		${from.tablet} {
			margin-bottom: ${space[6]}px;
		}
	`,
	bannerTicker: css`
		margin-bottom: ${space[4]}px;
		}
	`,
	bannerCloseButton: css`
		top: ${space[3]}px;
		right: ${space[3]}px;
		margin-left: ${space[3]}px;
	`,
};

export { templateSpacing };
