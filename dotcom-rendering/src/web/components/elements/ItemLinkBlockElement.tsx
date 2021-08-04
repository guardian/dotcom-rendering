import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';

type Props = {
	html: string;
};

const itemLinkStyles = css`
	${textSans.medium()}
	a {
		${textSans.medium({ fontWeight: 'bold' })}
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
