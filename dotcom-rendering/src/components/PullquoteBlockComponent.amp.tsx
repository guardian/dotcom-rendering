import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { article17, palette } from '@guardian/source/foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import Quote from '../static/icons/quote.svg';

const styles = (pillar: ArticleTheme) => css`
	background-color: ${palette.neutral[97]};
	padding: 0.375rem 0.625rem 0.75rem;
	margin-bottom: 0.75rem;
	display: block;
	color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	${article17};
	svg {
		fill: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

type Props = {
	html?: string;
	pillar: ArticleTheme;
};

export const PullquoteBlockComponent = ({ html, pillar }: Props) => {
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
