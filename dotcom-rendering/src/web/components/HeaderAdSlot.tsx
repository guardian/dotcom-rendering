import { css, Global } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { ArticleDisplay } from '@guardian/libs';
import { TOP_ABOVE_NAV_HEIGHT } from '@guardian/commercial-core/dist/esm/constants';

import { AdSlot, labelHeight } from '@root/src/web/components/AdSlot';
import { Hide } from '@root/src/web/components/Hide';

const headerWrapper = css`
	position: static;
`;

const padding = space[4] + 2; // 18px - currently being reviewed

const headerAdWrapper = css`
	z-index: 1080;
	width: 100%;
	background-color: ${neutral[97]};
	min-height: ${TOP_ABOVE_NAV_HEIGHT + padding + labelHeight}px;
	padding-bottom: ${padding}px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

const headerAdWrapperHidden = css`
	display: none;
`;

export const HeaderAdSlot: React.FC<{
	isAdFreeUser: boolean;
	shouldHideAds: boolean;
	display: ArticleDisplay;
}> = ({ isAdFreeUser, shouldHideAds, display }) => (
	<div css={headerWrapper}>
		<Global
			styles={css`
				/**
				* Hides the top-above-nav ad-slot container when a
				* Bonzai TrueSkin (Australian 3rd Party page skin) is shown
				* Temporary fix - introduced 06-Sep-2021
				*/
				.bz-custom-container
					~ #bannerandheader
					.top-banner-ad-container {
					display: none;
				}
			`}
		/>
		<Hide when="below" breakpoint="tablet">
			<div
				css={[
					headerAdWrapper,
					(isAdFreeUser || shouldHideAds) && headerAdWrapperHidden,
				]}
				className="top-banner-ad-container"
			>
				<AdSlot position="top-above-nav" display={display} />
			</div>
		</Hide>
	</div>
);
