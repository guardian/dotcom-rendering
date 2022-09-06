// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.span('centre-column-start', 3)}
	${headline.xxxsmall({ fontWeight: 'bold' })}
	color: ${text.standfirst(format)};
	grid-row: 5/6;
	padding-bottom: ${remSpace[2]};

	${from.tablet} {
		${grid.span('centre-column-start', 8)}
	}

	${from.desktop} {
		${grid.span('centre-column-start', 6)}
	}

	${darkModeCss`
		color: ${text.standfirstDark(format)};
	`}
`;

type Props = {
	standfirst: Option<DocumentFragment>;
	format: ArticleFormat;
};

const GalleryStandfirst: React.FC<Props> = ({ standfirst, format }) =>
	maybeRender(standfirst, (standfirstDoc) => (
		<div css={styles(format)}>
			{renderStandfirstText(standfirstDoc, format)}
		</div>
	));

// ----- Exports ----- //

export default GalleryStandfirst;
