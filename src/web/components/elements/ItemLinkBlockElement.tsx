import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

type Props = {
	html: string;
};

const itemLinkStyles = css`
	${textSans.medium()}
	font-weight: 400;
	a {
		${textSans.medium({ fontWeight: 'bold' })}
	}
	strong {
		font-weight: 400; /* Need to override globalStrongStyles */
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
