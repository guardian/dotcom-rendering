import { css } from '@emotion/react';
import { ArticleSpecial as Special } from '@guardian/libs';
import { headline, palette, textSans } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';

const style = (pillar: ArticleTheme) => css`
	h2 {
		margin-top: 24px;
		margin-bottom: 10px;
		${headline.xxsmall()};
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
		${headline.medium()};
		font-weight: 200;
	}
`;

// Labs paid content only
const subHeadingStyleLabs = css`
	h2 {
		font-weight: 700;
		${textSans.large()}
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
