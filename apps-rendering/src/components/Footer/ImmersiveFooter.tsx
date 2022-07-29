// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import LeftCentreBorder from 'grid/LeftCentreBorder';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import DefaultFooter, { defaultStyles } from './Footer.defaults';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.footer(format)};

	${darkModeCss`
		background-color: ${background.footerDark(format)};
	`}
`;

const footerStyles: SerializedStyles = css`
	${grid.column.centre}
	padding-left: 0;
	padding-right: 0;
	grid-row: 1;

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const ImmersiveFooter: FC<Props> = ({ format, isCcpa }) => (
	<div css={styles(format)}>
		<LeftCentreBorder rows={[1, 2]} />
		<DefaultFooter
			css={css(defaultStyles(format), footerStyles)}
			isCcpa={isCcpa}
		/>
	</div>
);

// ----- Exports ----- //

export default ImmersiveFooter;
