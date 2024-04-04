import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

type Props = {
	children: React.ReactNode;
	gap?: CSSProperties['gap'];
};

const styles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* Fixes IE 10/11 bug that collapses this container by default: */
	/* stylelint-disable-next-line property-no-vendor-prefix */
	-ms-flex-positive: 1;
`;

export const Flex = ({ children, gap }: Props) => (
	<div css={styles} style={{ gap }}>
		{children}
	</div>
);
