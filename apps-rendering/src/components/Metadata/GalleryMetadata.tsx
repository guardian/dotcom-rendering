// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { Option } from '@guardian/types';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import type { Contributor } from 'contributor';
import { grid } from 'grid/grid';
import { text } from 'palette';
import type { FC } from 'react';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	display: flex;
	flex-direction: column;
	color: ${text.gallery(format)};
	${grid.column.centre}
	grid-row: 9/10;
	padding: 0 ${remSpace[5]} ${remSpace[9]} 0;
`;

const textStyles = css`
	flex-grow: 1;
`;
const flexRowStyles = css`
	display: flex;
	flex-direction: row;
	align-items: stretch;
`;

type Props = {
	format: ArticleFormat;
	publishDate: Option<Date>;
	contributors: Contributor[];
	commentCount: Option<number>;
	commentable: boolean;
	edition: Edition;
};

const GalleryMetadata: FC<Props> = ({
	format,
	publishDate,
	contributors,
	commentCount,
	commentable,
	edition,
}) => (
	<div css={styles(format)}>
		<StraightLines count={1} />
		<div css={flexRowStyles}>
			<div css={textStyles}>
				<Follow format={format} contributors={contributors} />
			</div>
			<CommentCount
				count={commentCount}
				{...format}
				commentable={commentable}
			/>
		</div>
		<StraightLines count={1} />
		<Dateline date={publishDate} format={format} edition={edition} />
	</div>
);

// ----- Exports ----- //

export default GalleryMetadata;
