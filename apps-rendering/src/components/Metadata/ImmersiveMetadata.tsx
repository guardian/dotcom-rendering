// ----- Imports ----- //

import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
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
	flex-direction: column;
	${grid.column.centre}
	padding-bottom: ${remSpace[5]};

	${from.leftCol} {
		${grid.column.left}
	}
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

const ImmersiveMetadata: FC<Props> = ({
	format,
	publishDate,
	contributors,
	commentCount,
	commentable,
	edition,
}) => (
	<>
		<div css={styles}>
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
	</>
);

// ----- Exports ----- //

export default ImmersiveMetadata;
