import { css } from '@emotion/react';
import { body, neutral } from '@guardian/source-foundations';
import React from 'react';
import { pillarPalette_DO_NOT_USE } from '../../../lib/pillars';
import { ReactComponent as Quote } from '../../../static/icons/quote.svg';

const styles = (pillar: ArticleTheme) => css`
	background-color: ${neutral[97]};
	padding: 0.375rem 0.625rem 0.75rem;
	margin-bottom: 0.75rem;
	display: block;
	color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	${body.medium()};

	svg {
		fill: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

export const PullquoteBlockComponent: React.FC<{
	html?: string;
	pillar: ArticleTheme;
}> = ({ html, pillar }) => {
	if (!html) return <></>;
	return (
		<aside css={styles(pillar)}>
			<Quote />{' '}
			<span
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
		</aside>
	);
};
