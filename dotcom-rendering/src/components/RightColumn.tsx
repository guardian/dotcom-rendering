import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import type { Breakpoint } from '@guardian/source-foundations';

const hideBelow = (showFrom: Breakpoint) => css`
	${until[showFrom]} {
		display: none;
	}

	${from[showFrom]} {
		height: 100%;
		display: block;
		flex-basis: 300px;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

type Props = {
	children: React.ReactNode;
	showFrom?: Breakpoint;
};

export const RightColumn = ({ children, showFrom = 'desktop' }: Props) => {
	return <section css={hideBelow(showFrom)}>{children}</section>;
};
