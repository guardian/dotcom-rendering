import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { border, space } from '@guardian/src-foundations';

export const GuardianLabsLines = () => (
	<>
		<Lines count={1} effect="straight" color={border.primary} />
		<div
			css={css`
				height: ${space[2]}px;
			`}
		/>
		<Lines count={1} effect="dotted" color={border.primary} />
	</>
);
