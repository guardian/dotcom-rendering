import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { between, from } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';

type Props = {
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

const frontStyles = css`
	${from.wide} {
		margin-top: -6px;
	}
	${between.leftCol.and.wide} {
		width: 75%;
		margin-top: -42px;
	}
`;
export const MostViewedFooterLayout = ({ isFront, children }: Props) => {
	return (
		<div
			data-print-layout="hide"
			className="content-footer"
			css={stackBelow('desktop')}
		>
			<div css={[fixedWidths, isFront && frontStyles]}>{children}</div>
			<div
				css={css`
					margin: 6px 0 0 10px;
				`}
			>
				<AdSlot position="mostpop" />
			</div>
		</div>
	);
};
