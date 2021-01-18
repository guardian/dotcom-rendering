// ----- Imports ----- //

import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { border } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

const styles = css`
	${from.phablet} {
		border-right: 1px solid ${border.secondary};
	}

	${articleWidthStyles}
`;

const EditionsLines: FC = () => (
	<div css={styles}>
		<Lines />
	</div>
);

// ----- Exports ----- //

export default EditionsLines;
