import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Special } from '@guardian/types';

import { neutralBorder, pillarPalette } from '@root/src/lib/pillars';
import {
	ListStyle,
	LinkStyle,
} from '@root/src/amp/components/elements/TextBlockComponent';

const standfirstCss = (pillar: Theme) => css`
	${headline.xxxsmall()};
	font-weight: 100;
	color: ${palette.neutral[7]};
	margin-bottom: 12px;

	p {
		margin-bottom: 8px;
		font-weight: 200;
	}
	strong {
		font-weight: 700;
	}

	${ListStyle(neutralBorder(pillar))};
	${LinkStyle(pillar)};

	/* Styles for bullets, these are usually used on opinion articles */
	[data-dcr-style='bullet'] {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 0.75rem;
		width: 0.75rem;
		margin-right: 0.125rem;
		background-color: ${pillarPalette[pillar].main};
	}
`;

// Labs paid content only
const labsStyle = css`
	p,
	li {
		font-weight: 700;
		${textSans.large()}
	}
`;

export const Standfirst: React.SFC<{
	text: string;
	pillar: Theme;
}> = ({ text, pillar }) => {
	return (
		<div
			data-print-layout="hide"
			className={
				pillar === Special.Labs
					? cx(standfirstCss(pillar), labsStyle)
					: standfirstCss(pillar)
			}
			dangerouslySetInnerHTML={{
				__html: text,
			}}
		/>
	);
};
