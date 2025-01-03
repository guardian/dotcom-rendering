import { css } from '@emotion/react';
import { getZIndex, type ZIndex } from '../../lib/getZIndex';
import { palette } from '../../palette';

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
	z-index: ${getZIndex(zIndex)};
`;

const background = css`
	background-color: ${palette('--stuck-background')};
`;

// The css overrides here are necessary because ad-takeovers can inject css that breaks the banner
const bannerWrapper = css`
	/* stylelint-disable-next-line declaration-no-important */
	position: fixed !important;
	bottom: 0;
	/* stylelint-disable-next-line declaration-no-important */
	z-index: ${getZIndex('banner')} !important;
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
	<div css={[stickyStyles, addZindex(zIndex), background]}>{children}</div>
);

export const BannerWrapper = ({ children }: Props) => (
	<aside css={bannerWrapper}>{children}</aside>
);
