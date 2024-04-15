import { css } from '@emotion/react';
import { textSans15 } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';

const style = (pillar: ArticleTheme) => css`
	${textSans15};

	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

type Props = {
	html: string;
	pillar: ArticleTheme;
};

export const AffiliateDisclaimer = ({ html, pillar }: Props) => (
	<span
		css={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
