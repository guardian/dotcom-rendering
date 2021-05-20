import React from 'react';
import { css } from '@emotion/react';
import { AdSlot } from '@root/src/web/components/AdSlot';
import { Hide } from '@root/src/web/components/Hide';
import { Display } from '@guardian/types';

const headerWrapper = css`
	position: static;
`;

const headerAdWrapper = css`
	z-index: 1080;
	width: 100%;
	background-color: white;

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
			<div css={[headerAdWrapper, isAdFreeUser && headerAdWrapperHidden]}>
				<AdSlot position="top-above-nav" display={display} />
			</div>
		</Hide>
	</div>
);
