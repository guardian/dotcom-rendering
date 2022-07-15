// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';

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
	format: ArticleFormat;
	children: ReactNode;
}

const ListItem: FC<Props> = ({ format, children }) => (
	<li css={baseStyles}>{children}</li>
);

// ----- Exports ----- //

export default ListItem;
