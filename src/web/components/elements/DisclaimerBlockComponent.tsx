import React from 'react';
import { body } from '@guardian/src-foundations/typography';
import { css } from 'emotion';

const style = (palette: Palette) => css`
	${body.small()};

	a {
		color: ${palette.text.disclaimerLink};
	}

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
	palette: Palette;
}> = ({ html, palette }) => (
	<footer
		className={style(palette)}
		data-cy="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
