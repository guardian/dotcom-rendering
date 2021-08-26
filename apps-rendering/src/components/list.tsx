// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

const styles: SerializedStyles = css`
	list-style: none;
	margin: ${remSpace[3]} 0;
	padding-left: 0;
	clear: both;
`;

interface Props {
	children: ReactNode;
}

const List: FC<Props> = ({ children }) => <ul css={styles}>{children}</ul>;

// ----- Exports ----- //

export default List;
