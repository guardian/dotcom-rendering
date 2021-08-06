import { css } from '@emotion/react';

import { getZIndex, getZIndexImportant } from '@frontend/web/lib/getZIndex';

type Props = {
	children?: React.ReactNode;
};

type StuckProps = {
	children?: React.ReactNode;
	zIndex?: string;
};

const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const addZindex = (zIndex = 'stickyAdWrapper') => css`
	${getZIndex(zIndex)}
`;

const whiteBackground = css`
	background-color: white;
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
	max-height: 100vh;
	overflow: visible;
	width: 100% !important;
	background: none !important;
	top: auto !important;
`;

export const Stuck = ({ children, zIndex }: StuckProps) => (
	<div css={[stickyStyles, addZindex(zIndex), whiteBackground]}>
		{children}
	</div>
);

export const SendToBack = ({ children }: Props) => (
	<div css={headerWrapper}>{children}</div>
);

export const BannerWrapper = ({ children }: Props) => (
	<div id="bottom-banner" css={bannerWrapper}>
		{children}
	</div>
);
