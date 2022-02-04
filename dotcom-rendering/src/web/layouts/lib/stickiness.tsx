import { css } from '@emotion/react';

import { getZIndex } from '@frontend/web/lib/getZIndex';

type Props = {
	children?: React.ReactNode;
};

type StuckProps = {
	children?: React.ReactNode;
	zIndex?: string;
};

const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const addZindex = (zIndex = 'stickyAdWrapper') => css`
	${getZIndex(zIndex)}
`;

const whiteBackground = css`
	background-color: white;
`;

const headerWrapper = css`
	position: relative;
	${getZIndex('headerWrapper')}
`;

export const Stuck = ({ children, zIndex }: StuckProps) => (
	<div css={[stickyStyles, addZindex(zIndex), whiteBackground]}>
		{children}
	</div>
);

export const SendToBack = ({ children }: Props) => (
	<div css={headerWrapper}>{children}</div>
);
