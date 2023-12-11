// ----- Imports ----- //

import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import type { Contributor } from 'contributor';
import { grid } from 'grid/grid';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	display: flex;
	${grid.column.centre}
	padding-bottom: ${remSpace[5]};

	${from.leftCol} {
		${grid.column.left}
	}
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

const ImmersiveMetadata: FC<Props> = ({
	format,
	publishDate,
	contributors,
	commentCount,
	commentable,
	edition,
}) => (
	<div css={styles}>
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

export default ImmersiveMetadata;
