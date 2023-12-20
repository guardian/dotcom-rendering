import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';

const style = (pillar: ArticleTheme) => css`
	${textSans.small()};

	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

type Props = {
	html: string;
	pillar: ArticleTheme;
};

export const Disclaimer = ({ html, pillar }: Props) => (
	<span
		css={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
