import { css } from '@emotion/react';
import {
	headlineBold34,
	headlineBold42,
	headlineLight34,
} from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';

type Props = {
	position: number;
	html: string;
};

const titleStyles = css`
	h2 {
		${headlineLight34}
		color: ${themePalette('--numbered-list-heading')}
	}

	strong {
		${headlineBold34}
		display: block;
		color: ${themePalette('--numbered-list-title')};
	}
`;

const numberStyles = () => css`
	${headlineBold42}
	font-size: 56px;
	color: ${themePalette('--numbered-list-number')};
`;

export const NumberedTitleBlockComponent = ({ position, html }: Props) => {
	return (
		<div
			css={css`
				margin-top: -16px; /* Hack used to align Title number closer to adjacent divider */
			`}
		>
			<div css={numberStyles()}>{position}</div>
			<div css={titleStyles} dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
};
