import React from 'react';
import { css } from '@emotion/react';

import { Special } from '@guardian/types';
import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';

const style = (pillar: Theme) => css`
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

export const SubheadingBlockComponent: React.FC<{
	html: string;
	pillar: Theme;
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
