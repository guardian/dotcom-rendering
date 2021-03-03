// ----- Imports ----- //

import { css } from '@emotion/core';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	src: string;
	width: number;
	height: number;
}

const audioStyles = css`
	border: none;
`;

const Audio: FC<Props> = ({ src, width, height }) => (
	<iframe
		css={audioStyles}
		src={src}
		sandbox="allow-scripts"
		height={height}
		width={width}
		title="Audio element"
	/>
);

// ----- Exports ----- //

export default Audio;
