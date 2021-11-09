// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace, neutral } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

const styles: SerializedStyles = css`
	list-style: none;
	margin: ${remSpace[3]} 0;
	padding-left: 0;
	clear: both;

	> li::before {
		display: inline-block;
		content: '';
		border-radius: 0.5rem;
		height: 1rem;
		width: 1rem;
		margin-right: ${remSpace[2]};
		background-color: ${neutral[86]};
		margin-left: -${remSpace[6]};
		vertical-align: middle;
	}
`;

interface Props {
	children: ReactNode;
}

const List: FC<Props> = ({ children }) => <ul css={styles}>{children}</ul>;

// ----- Exports ----- //

export default List;
