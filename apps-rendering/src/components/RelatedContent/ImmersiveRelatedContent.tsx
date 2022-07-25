// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, neutral, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { grid } from 'grid/grid';
import LeftCentreBorder from 'grid/LeftCentreBorder';
import type { ResizedRelatedContent } from 'item';
import type { FC } from 'react';
import DefaultRelatedContent, {
	defaultStyles,
} from './RelatedContent.defaults';

// ----- Component ----- //

const styles = css`
	${grid.container}
`;

const hrStyles = css`
	${grid.column.all}
	grid-row: 1;
	width: 100%;
	border: 0;
	border-top: 1px solid ${neutral[46]};
	margin: 0;
`;

const relatedContentStyles = css`
	${grid.column.centre}
	grid-row: 2;
	border: 0;

	${until.wide} {
		padding-left: 0;
		padding-right: 0;
	}

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

type Props = {
	content: Option<ResizedRelatedContent>;
};

const ImmersiveRelatedContent: FC<Props> = ({ content }) => (
	<aside css={styles}>
		<hr css={hrStyles} />
		<DefaultRelatedContent
			content={content}
			css={css(defaultStyles, relatedContentStyles)}
		/>
		<LeftCentreBorder rows={[1, 3]} />
	</aside>
);

// ----- Exports ----- //

export default ImmersiveRelatedContent;
