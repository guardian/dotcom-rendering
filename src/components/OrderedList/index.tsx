// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

const styles: SerializedStyles = css`
	list-style: none;
	margin: ${remSpace[3]} 0;
	padding-left: 0;
	clear: both;

	counter-reset: li;
	> li::before {
		content: counter(li);
		counter-increment: li;
		display: block;
	}

	> li {
		padding-left: 0;
	}

	> li p:first-of-type {
		display: block;
	}
`;

interface Props {
	children: ReactNode;
	className?: SerializedStyles;
}

const OrderedList: FC<Props> = ({ children, className }) => (
	<ol css={[styles, className]}>{children}</ol>
);

// ----- Exports ----- //

export default OrderedList;
