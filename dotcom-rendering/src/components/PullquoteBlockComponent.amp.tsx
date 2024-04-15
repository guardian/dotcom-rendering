import { css } from '@emotion/react';
import { palette, textEgyptian17 } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import Quote from '../static/icons/quote.svg';

const styles = (pillar: ArticleTheme) => css`
	background-color: ${palette.neutral[97]};
	padding: 0.375rem 0.625rem 0.75rem;
	margin-bottom: 0.75rem;
	display: block;
	color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	${textEgyptian17};
	/**
 * @TODO (2) Typography preset styles should not be overridden.
 * Please speak to your team's designer and update this to use a more appropriate preset.
*/
	line-height: 1.4;

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
