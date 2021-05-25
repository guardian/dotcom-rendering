import React from 'react';
import { css } from '@emotion/react';

import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Special } from '@guardian/types';

import { neutralBorder } from '@root/src/lib/pillars';
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
`;

// Labs paid content only
const labsStyle = css`
	p,
	li {
		font-weight: 700;
		${textSans.large()}
	}
`;

export const Standfirst: React.FunctionComponent<{
	text: string;
	pillar: Theme;
}> = ({ text, pillar }) => {
	return (
		<div
			data-print-layout="hide"
			css={
				pillar === Special.Labs
					? [standfirstCss(pillar), labsStyle]
					: standfirstCss(pillar)
			}
			dangerouslySetInnerHTML={{
				__html: text,
			}}
		/>
	);
};
