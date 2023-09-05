import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { between, from, space } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';

type Props = {
	children: React.ReactNode;
	hasPageSkin?: boolean;
	isFront?: boolean;
	renderAds?: boolean;
};

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

const mostPopMargin = css`
	margin-top: 9px;
	${from.desktop} {
		margin: 9px 0 0 10px;
	}
	${from.leftCol} {
		margin: 6px 0 0 10px;
	}
`;

const mostPopMarginWithPageSkin = css`
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
		min-width: 962px;
	}
	${between.leftCol.and.wide} {
		width: 75%;
	}
	${from.wide} {
		min-width: 962px;
	}
`;

export const MostViewedFooterLayout = ({
	children,
	hasPageSkin = false,
	isFront,
	renderAds,
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
			<div css={hasPageSkin ? mostPopMarginWithPageSkin : mostPopMargin}>
				{renderAds && <AdSlot position="mostpop" />}
			</div>
		</div>
	);
};
