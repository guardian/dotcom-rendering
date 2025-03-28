import { css } from '@emotion/react';
import {
	headlineMedium14,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	textSans17,
	textSans20,
	textSans24,
	until,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SmallHeadlineSize } from '../types/layout';
import { Byline } from './Byline';
import { Kicker } from './Kicker';
import { QuoteIcon } from './QuoteIcon';

type HeadlineLink = {
	to: string; // the href for the anchor tag
	visitedColour?: string; // a custom colour for the :visited state
	preventFocus?: boolean; // if true, stop the link from being tabbable and focusable
};

type Props = {
	headlineText: string; // The text shown
	isLabs: boolean;
	showUnderline?: boolean; // Some headlines have text-decoration underlined when hovered
	kickerText?: string;
	showPulsingDot?: boolean;
	hasInlineKicker?: boolean;
	showQuotes?: boolean; // When true the QuoteIcon is shown
	size?: SmallHeadlineSize;
	link?: HeadlineLink; // An optional link object configures if/how the component renders an anchor tag
	byline?: string;
};

const fontStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			return css`
				${headlineMedium28};
			`;
		case 'large':
			return css`
				${headlineMedium24};
			`;
		case 'medium':
			return css`
				${headlineMedium20};
			`;
		case 'small':
			return css`
				${headlineMedium17};
			`;
		case 'tiny':
			return css`
				${headlineMedium14};
			`;
	}
};

const bylineLabsStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			return css`
				${textSans24};
			`;

		case 'large': {
			return css`
				${textSans24};
				${until.desktop} {
					${textSans20};
				}
			`;
		}
		case 'medium': {
			return css`
				${textSans20};
				${until.desktop} {
					${textSans17};
				}
			`;
		}
		case 'small':
		case 'tiny':
		default:
			return css`
				${textSans17};
			`;
	}
};

const textDecorationUnderline = css`
	text-decoration: underline;
`;

const linkStyles = css`
	position: relative;
	color: ${palette('--article-text')};
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const visitedStyles = (visitedColour: string) => css`
	:visited {
		color: ${visitedColour};
	}
`;

export const LinkHeadline = ({
	headlineText,
	showUnderline = false,
	kickerText,
	showPulsingDot,
	hasInlineKicker,
	isLabs,
	showQuotes = false,
	size = 'medium',
	link,
	byline,
}: Props) => {
	return (
		<h4 css={[fontStyles(size)]}>
			{!!kickerText && (
				<Kicker
					text={kickerText}
					color={palette('--link-kicker-text')}
					showPulsingDot={showPulsingDot}
					isInline={hasInlineKicker}
				/>
			)}
			{showQuotes && <QuoteIcon colour={palette('--link-kicker-text')} />}
			{link ? (
				// We were passed a link object so headline should be a link, with link styling
				<>
					<a
						css={[
							// Composed styles - order matters for colours
							linkStyles,
							showUnderline && textDecorationUnderline,
							link.visitedColour &&
								visitedStyles(link.visitedColour),
						]}
						href={link.to}
						// If link.preventFocus is true, set tabIndex to -1 to ensure this
						// link is not tabbed to. Useful if there is an outer link to the same
						// place, such as with MostViewed
						tabIndex={link.preventFocus ? -1 : undefined}
					>
						{headlineText}
					</a>
					{!!byline && (
						<Byline
							fontStyles={
								isLabs
									? bylineLabsStyles(size)
									: fontStyles(size)
							}
							text={byline}
						/>
					)}
				</>
			) : (
				// We don't have a link so simply use a span here
				<>
					<span>{headlineText}</span>
					{!!byline && (
						<Byline
							fontStyles={
								isLabs
									? bylineLabsStyles(size)
									: fontStyles(size)
							}
							text={byline}
						/>
					)}
				</>
			)}
		</h4>
	);
};
