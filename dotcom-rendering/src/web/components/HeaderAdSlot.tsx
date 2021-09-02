import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Display } from '@guardian/types';

import { AdSlot, labelHeight } from '@root/src/web/components/AdSlot';
import { Hide } from '@root/src/web/components/Hide';

const headerWrapper = css`
	position: static;
`;

const padding = space[4] + 2; // 18px - currently being reviewed

const headerAdWrapper = css`
	z-index: 1080;
	width: 100%;
	background-color: white;
	min-height: ${250 + padding + labelHeight}px;
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
	display: Display;
}> = ({ isAdFreeUser, shouldHideAds, display }) => (
	<div css={headerWrapper}>
		<Hide when="below" breakpoint="tablet">
			<div
				css={[
					headerAdWrapper,
					(isAdFreeUser || shouldHideAds) && headerAdWrapperHidden,
				]}
			>
				<AdSlot position="top-above-nav" display={display} />
			</div>
		</Hide>
	</div>
);
