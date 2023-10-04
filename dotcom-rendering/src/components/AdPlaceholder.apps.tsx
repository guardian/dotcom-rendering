import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';

const rightAdsPlaceholderClass = 'right-ad-portal-placeholder';
const adPlaceholderClass = 'ad-portal-placeholder';

const rightAdsStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	${until.desktop} {
		display: none;
	}
`;

const inlineAdsStyles = css`
	${from.desktop} {
		display: none;
	}
`;

/**
 * A server-side ad placeholder for apps, into which ads are inserted
 * client-side. See `AdPortals.importable.tsx` for more details.
 */
const RightAdsPlaceholder = () => (
	<div className={rightAdsPlaceholderClass} css={rightAdsStyles}></div>
);

/**
 * A server-side ad placeholder for apps, into which ads are inserted
 * client-side. See `AdPortals.importable.tsx` for more details.
 */
const AdPlaceholder = () => (
	<div className={adPlaceholderClass} css={inlineAdsStyles} />
);

export {
	AdPlaceholder,
	adPlaceholderClass,
	rightAdsPlaceholderClass,
	RightAdsPlaceholder,
};
