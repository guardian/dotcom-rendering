// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
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
	color: ${text.gallery(format)};
	${grid.column.centre}
	grid-row: 9/10;
	padding: 0 ${remSpace[5]} ${remSpace[9]} 0;
`;

const textStyles = css`
	flex-grow: 1;
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
		<div css={textStyles}>
			<Dateline date={publishDate} format={format} edition={edition} />
			<Follow format={format} contributors={contributors} />
		</div>
		<CommentCount
			count={commentCount}
			{...format}
			commentable={commentable}
		/>
	</div>
);

// ----- Exports ----- //

export default GalleryMetadata;
