import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { palette } from '../palette';
import { Byline } from './Byline';
import { Kicker } from './Kicker';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	headlineText: string; // The text shown
	format: ArticleFormat;
	showUnderline?: boolean; // Some headlines have text-decoration underlined when hovered
	kickerText?: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
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
				${headline.small()};
			`;
		case 'large':
			return css`
				${headline.xsmall()};
			`;
		case 'medium':
			return css`
				${headline.xxsmall()};
			`;
		case 'small':
			return css`
				${headline.xxxsmall()};
			`;
		case 'tiny':
			return css`
				${headline.xxxsmall()};
				font-size: 14px;
			`;
	}
};

const textDecorationUnderline = css`
	text-decoration: underline;
`;

const linkStyles = css`
	position: relative;
	color: inherit;
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
	format,
	showUnderline = false,
	kickerText,
	showPulsingDot,
	hideLineBreak,
	showQuotes = false,
	size = 'medium',
	link,
	byline,
}: Props) => {
	// const palette = decidePalette(format);

	return (
		<h4 css={fontStyles(size)}>
			{!!kickerText && (
				<Kicker
					text={kickerText}
					showPulsingDot={showPulsingDot}
					hideLineBreak={hideLineBreak}
				/>
			)}
			{showQuotes && <QuoteIcon colour={palette('--kicker')} />}
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
						<Byline text={byline} format={format} size={size} />
					)}
				</>
			) : (
				// We don't have a link so simply use a span here
				<>
					<span>{headlineText}</span>
					{!!byline && (
						<Byline text={byline} size={size} format={format} />
					)}
				</>
			)}
		</h4>
	);
};
