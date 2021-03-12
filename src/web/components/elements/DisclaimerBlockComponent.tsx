import React from 'react';
import { body } from '@guardian/src-foundations/typography';
import { css } from 'emotion';

const style = () => css`
	${body.small()};

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
}> = ({ html }) => (
	<footer
		className={style}
		data-cy="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
