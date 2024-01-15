import { css } from '@emotion/react';

const rightAdsPlaceholderClass = 'right-ad-portal-placeholder';
const adPlaceholderClass = 'ad-portal-placeholder';

const rightAdsStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
`;

/**
 * A server-side ad placeholder for apps, into which ads are inserted
 * client-side. See `AdPortals.importable.tsx` for more details.
 */
const RightAdsPlaceholder = () => (
	<aside className={rightAdsPlaceholderClass} css={rightAdsStyles} />
);

/**
 * A server-side ad placeholder for apps, into which ads are inserted
 * client-side. See `AdPortals.importable.tsx` for more details.
 */
const AdPlaceholder = () => <aside className={adPlaceholderClass} />;

export {
	AdPlaceholder,
	adPlaceholderClass,
	rightAdsPlaceholderClass,
	RightAdsPlaceholder,
};
