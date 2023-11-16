import { css } from '@emotion/react';
import { border, remSpace } from '@guardian/source-foundations';
import type { ReactComponent } from '../lib/ReactComponent';

const lineGap = remSpace[1];

const straightLines = css`
	background-image: repeating-linear-gradient(
		to bottom,
		${border.secondary},
		${border.secondary} 1px,
		transparent 1px,
		transparent ${lineGap}
	);
	background-repeat: repeat-x;
	background-position: top;

	background-size: 1px calc(${lineGap} * 3 + 1px);
	height: calc(${lineGap} * 3 + 1px);
`;

// Note, we should replace with @guardian/src-ed-lines once it is smaller in
// size/better suited to tree-shaking.
export const Lines: ReactComponent = () => {
	return <div css={straightLines} />;
};
