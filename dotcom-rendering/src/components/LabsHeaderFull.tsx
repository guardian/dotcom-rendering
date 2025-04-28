import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { palette } from '../palette';
import { LabsHeader } from './LabsHeader';

type Props = {
	editionId: EditionId;
	format: ArticleFormat;
};

const styles = css`
	background-color: ${palette('--labs-header-background')};
	${grid.subgrid}
`;

const wrapperStyles = css`
	${grid.column.centre}

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${from.leftCol} {
		${grid.between('left-column-start', 'right-column-end')}
	}
`;

export const LabsHeaderFull = ({ editionId, format }: Props) => {
	if (format.theme !== ArticleSpecial.Labs) {
		return null;
	}

	return (
		<section css={styles}>
			<div css={wrapperStyles}>
				<LabsHeader editionId={editionId} />
			</div>
		</section>
	);
};
