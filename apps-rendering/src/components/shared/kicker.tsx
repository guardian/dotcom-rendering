import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text as kickerText } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { OptionKind } from '@guardian/types';
import type { Option } from '@guardian/types';
import type { ReactElement } from 'react';

const dotStyles = (colour: string): SerializedStyles => {
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
	format: ArticleFormat,
	colour: string,
): ReactElement | null => {
	if (format.design === ArticleDesign.LiveBlog) {
		return <span css={dotStyles(colour)} />;
	} else {
		return null;
	}
};

const kickerStyles = (colour: string): SerializedStyles => css`
	color: ${colour};
	font-weight: 700;
	margin-right: ${remSpace[1]};
`;

const slashStyles = css`
	&::after {
		content: '/';
		display: inline-block;
		margin-left: ${remSpace[1]};
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
	format: ArticleFormat,
	text: Option<string>,
): ReactElement | null => {
	const getKickerText = (): string | null => {
		if (text.kind === OptionKind.Some && text.value.length > 0) {
			return text.value;
		} else {
			if (format.design === ArticleDesign.LiveBlog) {
				// Liveblogs have their kicker overridden
				return 'Live';
			} else {
				// No kicker text and not a liveblog card
				return null;
			}
		}
	};

	const kickerString = getKickerText();

	if (kickerString) {
		const kickerColour = kickerText.kicker(format);
		return (
			<>
				<span css={kickerStyles(kickerColour)}>
					{liveDot(format, kickerColour)}
					{slash(kickerString)}
				</span>
			</>
		);
	} else {
		return null;
	}
};
