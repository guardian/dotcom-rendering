import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { type CrosswordProps } from '@guardian/react-crossword';
import { space } from '@guardian/source/foundations';
import { crosswordActionContext } from '../lib/puzzleActionTracking';
import { PrintButton } from './PrintButton.island';

const crosswordLinkStyles = css`
	margin: ${space[2]}px 0;
`;

export const CrosswordLinks = ({
	crossword,
}: {
	crossword: CrosswordProps['data'];
}) => {
	return (
		isUndefined(crossword.pdf) || (
			<div css={crosswordLinkStyles}>
				<PrintButton
					href={crossword.pdf}
					puzzleTrackingSource="crossword-page"
					puzzleTrackingContext={crosswordActionContext(crossword)}
				/>
			</div>
		)
	);
};
