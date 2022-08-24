// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import DefaultFooter, { defaultStyles } from './Footer.defaults';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.footer(format)};

	${darkModeCss`
		background-color: ${neutral[10]};
	`}
`;

const spacerStyles = css`
	${grid.column.centre}
	padding: ${remSpace[3]};
	margin: 0;

	${from.leftCol} {
		${grid.column.left}
		position: relative;
		grid-row: 1;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[86]};
			right: -10px;
		}

		${darkModeCss`
			&::before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				border-left: 1px solid ${neutral[20]};
				left: -10px;
			}

			&::after {
				border-color: ${neutral[20]}
			}
		`}
	}
`;

const footerStyles: SerializedStyles = css`
	${grid.column.centre}
	padding-left: 0;
	padding-right: 0;
	grid-row: 1;

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${darkModeCss`
		background-color: ${neutral[10]};
		color: ${neutral[86]};
	`}
`;

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const ImmersiveFooter: FC<Props> = ({ format, isCcpa }) => (
	<div css={styles(format)}>
		<div css={spacerStyles} />
		<DefaultFooter
			css={css(defaultStyles(format), footerStyles)}
			isCcpa={isCcpa}
		/>
	</div>
);

// ----- Exports ----- //

export default ImmersiveFooter;
