import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { BannerData } from '../designableBanner/exports';
import { BannerLogo } from '../designableBanner/exports';

const styles = css`
	margin-top: ${space[2]}px;
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
