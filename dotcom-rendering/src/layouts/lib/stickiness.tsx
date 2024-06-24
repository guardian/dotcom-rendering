import { css } from '@emotion/react';
import type { ZIndex } from '../../lib/getZIndex';
import { getZIndex, getZIndexImportant } from '../../lib/getZIndex';

type Props = {
	children?: React.ReactNode;
};

type StuckProps = {
	children?: React.ReactNode;
	zIndex?: ZIndex;
};

const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const addZindex = (zIndex: ZIndex = 'stickyAdWrapper') => css`
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
const bannerWrapper = css`
	/* stylelint-disable-next-line declaration-no-important */
	position: fixed !important;
	bottom: 0;
	${getZIndexImportant('banner')}
	max-height: 90vh;
	overflow: auto;
	/* stylelint-disable-next-line declaration-no-important */
	width: 100% !important;
	/* stylelint-disable-next-line declaration-no-important */
	background: none !important;
	/* stylelint-disable-next-line declaration-no-important */
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
	<aside css={bannerWrapper}>{children}</aside>
);
