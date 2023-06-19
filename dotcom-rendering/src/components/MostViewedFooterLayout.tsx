import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { between, from } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';

type Props = {
	isFront?: boolean;
	renderAds?: boolean;
	children: React.ReactNode;
	hasPageSkin?: boolean;
};

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const fixedWidths = css`
	width: 100%;
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
	margin: 9px 0 0 10px;
	${from.leftCol} {
		margin: 6px 0 0 10px;
	}
`;

const mostPopMarginWithPageSkin = css`
	margin: 9px 0 0 10px;
`;

const frontStyles = css`
	${from.wide} {
		margin-top: -7px;
	}
	${between.leftCol.and.wide} {
		margin-top: -42px;
	}
`;

const adFreeStyles = css`
	${from.wide} {
		width: 75%;
	}
	${between.leftCol.and.wide} {
		width: 76%;
	}
`;

export const MostViewedFooterLayout = ({
	isFront,
	children,
	renderAds,
	hasPageSkin = false,
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
					isFront && frontStyles,
					!renderAds && adFreeStyles,
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
