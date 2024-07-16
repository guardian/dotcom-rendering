import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-development-kitchen/react-components';
import { palette } from '../palette';

const block = css`
	display: block;
`;

export const GuardianLabsLines = () => (
	<>
		<StraightLines
			cssOverrides={block}
			count={1}
			color={palette('--straight-lines')}
		/>
		<div
			css={css`
				height: ${space[2]}px;
			`}
		/>
		<DottedLines
			cssOverrides={block}
			count={1}
			color={palette('--straight-lines')}
		/>
	</>
);
