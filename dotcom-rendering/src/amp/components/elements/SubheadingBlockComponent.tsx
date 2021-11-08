import React from 'react';
import { css } from '@emotion/react';

import { ArticleSpecial as Special } from '@guardian/libs';
import { headline, textSans, neutral } from '@guardian/source-foundations';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';

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
		border-bottom: 1px solid ${neutral[86]};
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

export const SubheadingBlockComponent: React.FC<{
	html: string;
	pillar: ArticleTheme;
	isImmersive: boolean;
}> = ({ html, pillar, isImmersive }) => (
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
