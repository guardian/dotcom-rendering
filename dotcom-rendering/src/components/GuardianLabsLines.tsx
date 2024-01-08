import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-react-components-development-kitchen';

const block = css`
	display: block;
`;

export const GuardianLabsLines = () => (
	<>
		<StraightLines
			cssOverrides={block}
			count={1}
			color={palette.neutral[60]}
		/>
		<div
			css={css`
				height: ${space[2]}px;
			`}
		/>
		<DottedLines
			cssOverrides={block}
			count={1}
			color={palette.neutral[60]}
		/>
	</>
);
