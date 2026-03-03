import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import type { Breakpoint } from '@guardian/source/foundations';

const hideBelow = (showFrom: Breakpoint) => css`
	${until[showFrom]} {
		display: none;
	}

	${from[showFrom]} {
		display: block;
	}
`;

type Props = {
	children: React.ReactNode;
	showFrom?: Breakpoint;
};

export const RightColumn = ({ children, showFrom = 'desktop' }: Props) => {
	return <section css={hideBelow(showFrom)}>{children}</section>;
};
