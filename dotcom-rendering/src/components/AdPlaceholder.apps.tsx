import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';

const rightAdsPlaceholderClass = 'right-ad-portal-placeholder';

const rightAdsStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	${until.desktop} {
		display: none;
	}
`;

const RightAdsPlaceholder = () => (
	<div className={rightAdsPlaceholderClass} css={rightAdsStyles}></div>
);

export { rightAdsPlaceholderClass, RightAdsPlaceholder };
