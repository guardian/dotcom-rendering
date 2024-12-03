import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';

const pillStyles = css`
	padding: ${space[1]}px ${space[3]}px;
	border-radius: ${space[3]}px;
	${textSansBold12};
	color: white;
	background-color: rgba(0, 0, 0, 0.7);
`;

export const Pill = () => <span css={pillStyles}>Pill</span>;
