import { css, type SerializedStyles } from '@emotion/react';
import { palette } from '../palette';

type Props = {
	text: string;
	fontStyles: SerializedStyles;
	/** Optional override of the standard text colour */
	colour?: string;
};

const baseStyles = (colour: string) => css`
	display: block;
	color: ${colour};
`;

export const Byline = ({
	text,
	fontStyles,
	colour = palette('--byline'),
}: Props) => {
	return <span css={[baseStyles(colour), fontStyles]}>{text}</span>;
};
