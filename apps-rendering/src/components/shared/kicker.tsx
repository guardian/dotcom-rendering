import { css } from '@emotion/react';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { OptionKind, some, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import type { ReactElement } from 'react';
import { getThemeStyles } from 'themeStyles';

const dotStyles = (colour: string) => {
	return css`
		color: ${colour};
		:before {
			border-radius: 62.5rem;
			display: inline-block;
			position: relative;
			background-color: currentColor;
			width: 0.75em;
			height: 0.75em;
			content: '';
			margin-right: ${remSpace[1]};
			vertical-align: initial;
		}
	`;
};

const liveDot = (
	type: RelatedItemType,
	colour: string,
): ReactElement | null => {
	if (type === RelatedItemType.LIVE) {
		return <span css={dotStyles(colour)} />;
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
	text: Option<string>,
): ReactElement | null => {

	const getKickerText = (): string | null => {
		if (text.kind === OptionKind.Some && text.value.length > 0) {
			return text.value;
		} else {
			if (type === RelatedItemType.LIVE) {
				return 'Live';
			} else {
				// No kicker text and not a liveblog card
				return null;
			}
		}
	};

	const kickerText = getKickerText();
	if (kickerText) {
		const { kicker, liveblogKicker } = getThemeStyles(format.theme);
		const kickerColour = withDefault(kicker)(some(liveblogKicker));

		return (
			<>
				<span css={kickerStyles(kickerColour)}>
					{liveDot(type, kickerColour)}
					{slash(kickerText)}
				</span>
			</>
		);
	} else {
		return null;
	}
};
