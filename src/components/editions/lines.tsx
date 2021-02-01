// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';
import { borderWidthStyles } from './styles';

// ----- Component ----- //

const styles = css`
	box-sizing: border-box;

	${from.tablet} {
		margin: 0 auto;
	}

	${borderWidthStyles}
`;

interface Props {
	className?: SerializedStyles;
}

const EditionsLines: FC<Props> = ({ className }) => (
	<div css={[styles, className]}>
		<Lines />
	</div>
);

// ----- Exports ----- //

export default EditionsLines;
