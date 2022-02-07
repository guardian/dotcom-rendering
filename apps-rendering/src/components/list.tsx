// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { neutral, remSpace } from '@guardian/source-foundations';
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
		border-radius: 50%;
		height: 0.75em;
		width: 0.75em;
		transform: translateY(-0.1em);
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
