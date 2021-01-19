// ----- Imports ----- //

import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';
import { tabletContentWidth, wideContentWidth } from './styles';

// ----- Component ----- //

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

const styles = css`
	box-sizing: border-box;

	${from.tablet} {
		margin: 0 auto;
	}

	${from.tablet} {
		width: ${tablet}px;
	}

	${from.wide} {
		width: ${wide}px;
	}
`;

const EditionsLines: FC = () => (
	<div css={styles}>
		<Lines />
	</div>
);

// ----- Exports ----- //

export default EditionsLines;
