// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '../../articleFormat';
import { remSpace } from '@guardian/source/foundations';
import { background } from 'palette';
import type { ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (
	usePillarColour: boolean,
	format: ArticleFormat,
): SerializedStyles => css`
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
		background-color: ${background.bullet(format, false)};
		margin-left: -${remSpace[6]};
		vertical-align: middle;

		${darkModeCss`
			background-color: ${background.bulletDark(format, usePillarColour)};
		`}
	}
`;

interface Props {
	children: ReactNode;
	usePillarColour: boolean;
	format: ArticleFormat;
}

const List = ({ children, usePillarColour, format }: Props) => (
	<ul css={styles(usePillarColour, format)} role="list">
		{children}
	</ul>
);

// ----- Exports ----- //

export default List;
