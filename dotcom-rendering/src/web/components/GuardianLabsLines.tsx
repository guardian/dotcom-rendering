import { css } from '@emotion/react';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-react-components-development-kitchen';
import { border, space } from '@guardian/source-foundations';

export const GuardianLabsLines = () => (
	<>
		<StraightLines count={1} color={border.primary} />
		<div
			css={css`
				height: ${space[2]}px;
			`}
		/>
		<DottedLines count={1} color={border.primary} />
	</>
);
