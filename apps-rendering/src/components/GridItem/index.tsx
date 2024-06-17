// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ReactNode } from 'react';

// ----- Component ----- //

const styles = (area: string): SerializedStyles => css`
	grid-area: ${area};
`;

interface Props {
	area: string;
	children: ReactNode;
}

const GridItem = ({ area, children }: Props) => (
	<div css={styles(area)}>{children}</div>
);

// ----- Exports ----- //

export default GridItem;
