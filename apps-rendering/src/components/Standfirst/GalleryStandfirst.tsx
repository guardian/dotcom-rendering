// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { Optional } from 'optional';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	${headline.xxxsmall({ fontWeight: 'bold' })}
	color: ${text.standfirst(format)};
	grid-row: 5/6;
	padding: ${remSpace[2]} ${remSpace[5]} ${remSpace[9]} 0;

	${from.mobileLandscape} {
		padding-top: ${remSpace[4]};
	}

	${from.tablet} {
		padding-top: ${remSpace[1]};
	}

	${darkModeCss`
		color: ${text.standfirstDark(format)};
	`}
`;

type Props = {
	standfirst: Optional<DocumentFragment>;
	format: ArticleFormat;
};

const GalleryStandfirst: React.FC<Props> = ({ standfirst, format }) =>
	maybeRender(standfirst.toOption(), (standfirstDoc) => (
		<div css={styles(format)}>
			{renderStandfirstText(standfirstDoc, format)}
		</div>
	));

// ----- Exports ----- //

export default GalleryStandfirst;
