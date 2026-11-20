import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import type { BannerData } from '../designableBanner/exports';
import { BannerLogo } from '../designableBanner/exports';

const styles = css`
	grid-area: logo;

	${until.leftCol} {
		display: none;
	}

	${from.leftCol} {
		justify-self: end;
	}

	> div {
		margin-top: 28px;
	}
`;

export const NewsletterBannerLogo = ({
	bannerData,
}: {
	bannerData: BannerData;
}) => (
	<div css={styles}>
		<BannerLogo bannerData={bannerData} />
	</div>
);
