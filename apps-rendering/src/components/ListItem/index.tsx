// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';
import type { ReactNode } from 'react';

// ----- Component ----- //

const baseStyles = css`
	padding-left: ${remSpace[6]};
	padding-bottom: 0.375rem;

	> p:first-of-type {
		display: inline;
		padding: 0;
	}
`;

interface Props {
	children: ReactNode;
	className?: SerializedStyles;
}

const ListItem = ({ children, className }: Props) => (
	<li css={[baseStyles, className]}>{children}</li>
);

// ----- Exports ----- //

export default ListItem;
