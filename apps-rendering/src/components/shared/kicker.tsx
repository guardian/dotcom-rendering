import { css } from '@emotion/react';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import type { ArticleFormat } from '@guardian/libs';
import { some, withDefault } from '@guardian/types';
import type { ReactElement } from 'react';
import { getThemeStyles } from 'themeStyles';

const dotStyles = (format: ArticleFormat) => {
	const { liveblogKicker } = getThemeStyles(format.theme);
	return css`
		color: ${liveblogKicker};
		:before {
			border-radius: 62.5rem;
			display: inline-block;
			position: relative;
			background-color: currentColor;
			width: 0.75em;
			height: 0.75em;
			content: '';
			margin-right: 0.1875rem;
			vertical-align: initial;
		}
	`;
};

const liveDot = (
	type: RelatedItemType,
	format: ArticleFormat,
): ReactElement | null => {
	if (type === RelatedItemType.LIVE) {
		return <span css={dotStyles(format)} />;
	} else {
		return null;
	}
};

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
`;

const slashStyles = css`
	&::after {
		content: '/';
		display: inline-block;
		margin-left: 4px;
	}
`;

const slash = (text: string): ReactElement | null => {
	if (text) {
		return <span css={slashStyles}>{text}</span>;
	} else {
		return null;
	}
};
export const kicker = (
	type: RelatedItemType,
	format: ArticleFormat,
	text: string,
): ReactElement | null => {
	const kickerText =
		type === RelatedItemType.LIVE ? 'Live' : withDefault('')(some(text));

	if (kickerText) {
		const { kicker, liveblogKicker } = getThemeStyles(format.theme);
		const kickerColour = withDefault(kicker)(some(liveblogKicker));

		return (
			<>
				<span css={kickerStyles(kickerColour)}>
					{liveDot(type, format)}
					{slash(kickerText)}
				</span>
			</>
		);
	} else {
		return null;
	}
};
