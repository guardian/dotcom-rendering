import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { between, from } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';

type Props = {
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

export const MostViewedFooterLayout = ({
	children,
	hasPageSkin = false,
}: Props) => {
	return (
		<div
			data-print-layout="hide"
			className="content-footer"
			css={stackBelow('desktop')}
		>
			<div css={hasPageSkin ? fixedWidthsPageSkin : fixedWidths}>
				{children}
			</div>
			<div css={hasPageSkin ? mostPopMarginWithPageSkin : mostPopMargin}>
				<AdSlot position="mostpop" />
			</div>
		</div>
	);
};
