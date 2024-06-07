import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source/foundations';
import { between, from, space } from '@guardian/source/foundations';
import { AdSlot } from './AdSlot.web';

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const fixedWidths = css`
	margin-left: -1px;
	${between.desktop.and.wide} {
		min-width: 627px;
	}
	${from.wide} {
		min-width: 718px;
	}
`;

const fixedWidthsPageSkin = css`
	width: 100%;
	${from.desktop} {
		min-width: 627px;
	}
`;

const advertMargin = (hasHideButton: boolean, isDeeplyRead: boolean) => css`
	margin-top: 9px;
	${from.desktop} {
		margin-top: 0;
		margin-left: 10px;
	}
	${from.leftCol} {
		margin-top: 10px;
	}
	${hasHideButton && from.leftCol} {
		margin-top: 2px;
	}
	${hasHideButton && from.wide} {
		margin-top: 36px;
	}
	${hasHideButton && isDeeplyRead && from.desktop} {
		margin-top: 9px;
	}
	${hasHideButton && isDeeplyRead && from.leftCol} {
		margin-top: 38px;
	}
	${hasHideButton && isDeeplyRead && from.wide} {
		margin-top: 54px;
	}
`;

const advertMarginWithPageSkin = css`
	margin: 9px 0 0 10px;
`;

const frontStyles = (hasPageSkin: boolean) => css`
	${from.wide} {
		margin-top: -${space[2]}px;
	}
	${!hasPageSkin && between.leftCol.and.wide} {
		margin-top: -${space[12] - 6}px;
	}
`;

const adFreeStyles = css`
	${between.desktop.and.leftCol} {
		min-width: 960px;
	}
	${between.leftCol.and.wide} {
		width: 75%;
	}
	${from.wide} {
		min-width: 960px;
	}
`;

type Props = {
	children: React.ReactNode;
	hasPageSkin?: boolean;
	isFront?: boolean;
	renderAds?: boolean;
	isDeeplyRead?: boolean;
};

export const MostViewedFooterLayout = ({
	children,
	isFront,
	renderAds,
	hasPageSkin = false,
	isDeeplyRead = false,
}: Props) => {
	return (
		<div
			data-print-layout="hide"
			className="content-footer"
			css={stackBelow('desktop')}
		>
			<div
				css={[
					hasPageSkin ? fixedWidthsPageSkin : fixedWidths,
					isFront && frontStyles(hasPageSkin),
					!renderAds && !hasPageSkin && adFreeStyles,
				]}
			>
				{children}
			</div>
			{renderAds && (
				<div
					css={
						hasPageSkin
							? advertMarginWithPageSkin
							: advertMargin(!!isFront, isDeeplyRead)
					}
				>
					<AdSlot position="mostpop" />
				</div>
			)}
		</div>
	);
};
