import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { between, from } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';

type Props = {
	renderAds?: boolean;
	isFront?: boolean;
	children: React.ReactNode;
};

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const fixedWidths = (
	renderAds: boolean | undefined,
	isFront: boolean | undefined,
) => css`
	width: 100%;
	${between.desktop.and.wide} {
		min-width: 627px;
	}
	${from.wide} {
		min-width: 718px;
	}
	${!renderAds && `${from.leftCol}{width: 75%;}`}
	${isFront && `${between.leftCol.and.wide}{margin-top: -34px;}`}
`;

export const MostViewedFooterLayout = ({
	renderAds,
	isFront,
	children,
}: Props) => {
	return (
		<div
			data-print-layout="hide"
			className="content-footer"
			css={stackBelow('desktop')}
		>
			<div css={fixedWidths(renderAds, isFront)}>{children}</div>
			<div
				css={css`
					margin: 6px 0 0 10px;
				`}
			>
				{renderAds && <AdSlot position="mostpop" />}
			</div>
		</div>
	);
};
