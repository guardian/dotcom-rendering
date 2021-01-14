// ----- Imports ----- //

import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

const styles = css`
	${from.phablet} {
		width: ${wideContentWidth}px;
	}
`;

const EditionsLines: FC = () => (
	<div css={styles}>
		<Lines />
	</div>
);

// ----- Exports ----- //

export default EditionsLines;
