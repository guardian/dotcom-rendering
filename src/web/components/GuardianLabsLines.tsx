import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { space } from '@guardian/src-foundations';

export const GuardianLabsLines = () => (
	<>
		<Lines count={1} effect="straight" />
		<div
			css={css`
				height: ${space[2]}px;
			`}
		/>
		<Lines count={1} effect="dotted" />
	</>
);
