import { css } from '@emotion/react';
import { space, from } from '@guardian/source/foundations';

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

		${from.tablet} {
			margin-bottom: ${space[3]}px;
		}
	`,
	bannerCloseButton: css`
		top: ${space[3]}px;
		right: ${space[3]}px;
		margin-left: ${space[3]}px;
	`,
};

export { templateSpacing };
