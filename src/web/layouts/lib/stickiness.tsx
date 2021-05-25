import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';

import { getZIndex, getZIndexImportant } from '@frontend/web/lib/getZIndex';

type Props = {
	children?: React.ReactNode;
};

// The advert is stuck to the top of the container as we scroll
// until we hit the bottom of the wrapper that contains
// the top banner and the header/navigation
// We apply sticky positioning and z-indexes, the stickAdWrapper and headerWrapper
// classes are tightly coupled.
const stickyAdWrapper = css`
	background-color: white;
	border-bottom: 0.0625rem solid ${border.secondary};
	position: sticky;
	top: 0;
	${getZIndex('stickyAdWrapper')}
`;

const headerWrapper = css`
	position: relative;
	${getZIndex('headerWrapper')}
`;

// The css overrides here are necessary because ad-takeovers can inject css that breaks the banner
// Overflow is visible because puzzles banner needs it to render correctly
const bannerWrapper = css`
	position: fixed !important;
	bottom: 0;
	${getZIndexImportant('banner')}
	max-height: 80vh;
	overflow: visible;
	width: 100% !important;
	background: none !important;
	top: auto !important;
`;

export const Stuck = ({ children }: Props) => (
	<div css={stickyAdWrapper}>{children}</div>
);

export const SendToBack = ({ children }: Props) => (
	<div css={headerWrapper}>{children}</div>
);

export const BannerWrapper = ({ children }: Props) => (
	<div id="bottom-banner" css={bannerWrapper}>
		{children}
	</div>
);
