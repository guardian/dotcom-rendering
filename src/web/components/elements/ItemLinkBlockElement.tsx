import React from 'react';
import { css } from 'emotion';

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
		<div
			className={itemLinkStyles}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};
