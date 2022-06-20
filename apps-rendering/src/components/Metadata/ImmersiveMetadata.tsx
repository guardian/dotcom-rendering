// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
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
};

const ImmersiveMetadata: FC<Props> = ({
	format,
	publishDate,
	contributors,
	commentCount,
	commentable,
}) => (
	<div css={styles}>
		<div css={textStyles}>
			<Dateline date={publishDate} format={format} />
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
