// ----- Imports ----- //

import { css } from '@emotion/react';

// ----- Component ----- //

interface Props {
	src: string;
	width: number;
	height: number;
}

const audioStyles = css`
	border: none;
`;

const Audio = ({ src, width, height }: Props) => (
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
