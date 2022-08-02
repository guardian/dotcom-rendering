// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { body, from, neutral, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import { renderStandfirstText } from 'renderer';

// ----- Component ----- //

const styles = css`
	${grid.span('centre-column-start', 3)}
	${body.medium({ fontWeight: 'bold', lineHeight: 'tight' })}
	color: ${neutral[100]};
	grid-row: 5/6;
	padding-bottom: ${remSpace[2]};

	${from.tablet} {
		${grid.span('centre-column-start', 8)}
	}

	${from.desktop} {
		${grid.span('centre-column-start', 6)}
	}
`;

type Props = {
	standfirst: Option<DocumentFragment>;
	format: ArticleFormat;
};

const GalleryStandfirst: React.FC<Props> = ({ standfirst, format }) =>
	maybeRender(standfirst, (standfirstDoc) => (
		<div css={styles}>{renderStandfirstText(standfirstDoc, format)}</div>
	));

// ----- Exports ----- //

export default GalleryStandfirst;
