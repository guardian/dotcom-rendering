import { css } from '@emotion/react';
import { type ArticleTheme, ArticleSpecial as Special } from '@guardian/libs';
import {
	headlineMedium20,
	headlineMedium34,
	palette,
	textSans20,
} from '@guardian/source/foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';

const style = (pillar: ArticleTheme) => css`
	h2 {
		margin-top: 24px;
		margin-bottom: 10px;
		${headlineMedium20};
	}
	strong {
		font-weight: 700;
	}
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${palette.neutral[86]};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const immersiveBodyStyle = css`
	h2 {
		${headlineMedium34};
		font-weight: 200;
	}
`;

// Labs paid content only
const subHeadingStyleLabs = css`
	h2 {
		font-weight: 700;
		${textSans20}
	}
`;

type Props = {
	html: string;
	pillar: ArticleTheme;
	isImmersive: boolean;
};

export const SubheadingBlockComponent = ({
	html,
	pillar,
	isImmersive,
}: Props) => (
	<span
		css={
			pillar === Special.Labs
				? [
						style(pillar),
						isImmersive && immersiveBodyStyle,
						subHeadingStyleLabs,
				  ]
				: style(pillar)
		}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
