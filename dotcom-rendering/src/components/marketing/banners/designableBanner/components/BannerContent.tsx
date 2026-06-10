import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import type { BannerData } from '../BannerProps';

const phabletContentMaxWidth = '492px';

const styles = {
	contentContainer: css`
		grid-area: copy-container;

		max-width: 100%;
		align-self: start;

		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
		}
		${from.desktop} {
			padding-right: ${space[5]}px;
		}
		${from.leftCol} {
			padding-left: ${space[3]}px;
		}
	`,
};

export const BannerContent = ({
	children,
	bannerData,
}: {
	children: React.ReactNode;
	bannerData: BannerData;
}): JSX.Element | null => {
	if (!bannerData.design) {
		return null;
	}

	return <div css={styles.contentContainer}>{children}</div>;
};
