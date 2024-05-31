import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';

type Props = {
	html: string;
};

const itemLinkStyles = css`
	${textSans17}
	a {
		${textSansBold17}
	}
	strong {
		display: block;
	}
`;

export const ItemLinkBlockElement = ({ html }: Props) => {
	return (
		<div css={itemLinkStyles} dangerouslySetInnerHTML={{ __html: html }} />
	);
};
