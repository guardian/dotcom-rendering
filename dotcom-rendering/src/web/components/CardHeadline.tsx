import { css } from '@emotion/react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { headline, textSans, until, space } from '@guardian/source-foundations';

import { QuoteIcon } from './QuoteIcon';
import { Kicker } from './Kicker';
import { Byline } from './Byline';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	headlineText: string; // The text shown
	format: ArticleFormat; // Used to decide when to add type specific styles
	kickerText?: string;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	size?: SmallHeadlineSize;
	byline?: string;
	showByline?: boolean;
	showLine?: boolean; // If true a short line is displayed above, used for sublinks
};

const fontStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'large':
			return css`
				${headline.xsmall()};
				${until.desktop} {
					${headline.xxsmall()};
				}
			`;
		case 'medium':
			return css`
				${headline.xxsmall()};
				${until.desktop} {
					${headline.xxxsmall()};
				}
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

const labTextStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'large':
			return css`
				${textSans.large()};
				${until.desktop} {
					${textSans.medium()};
				}
			`;
		case 'medium':
			return css`
				${textSans.large({ lineHeight: 'tight' })};
				${until.desktop} {
					${textSans.medium({ lineHeight: 'tight' })};
				}
				padding-bottom: ${space[1]}px;
			`;
		case 'small':
			return css`
				${textSans.small()};
			`;
		case 'tiny':
			return css`
				${textSans.xxsmall()};
				font-size: 14px;
			`;
	}
};

const underlinedStyles = (size: SmallHeadlineSize, colour: string) => {
	function underlinedCss(baseSize: number) {
		return css`
			background-image: linear-gradient(
				to bottom,
				transparent,
				transparent ${baseSize - 1}px,
				${colour}
			);
			line-height: ${baseSize}px;
			background-size: 1px ${baseSize}px;
			background-origin: content-box;
			background-clip: content-box;
			margin-right: -5px;
		`;
	}

	function underlinedCssWithMediaQuery(
		baseSize: number,
		untilDesktopSize: number,
	) {
		return css`
			${until.desktop} {
				${underlinedCss(untilDesktopSize)}
			}

			${underlinedCss(baseSize)}
		`;
	}

	switch (size) {
		case 'large':
			return underlinedCssWithMediaQuery(29, 29);
		case 'medium':
			return underlinedCssWithMediaQuery(25, 25);
		case 'small':
			return underlinedCss(22);
		case 'tiny':
			return underlinedCss(24);
	}
};

const lineStyles = (palette: Palette) => css`
	:before {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		width: 120px;
		border-top: 1px solid ${palette.border.cardSupporting};
	}
`;

export const CardHeadline = ({
	headlineText,
	format,
	showQuotes,
	kickerText,
	showPulsingDot,
	showSlash,
	size = 'medium',
	byline,
	showByline,
	showLine,
}: Props) => {
	const palette = decidePalette(format);
	return (
		<>
			<h4
				css={[
					format.theme === ArticleSpecial.Labs
						? labTextStyles(size)
						: fontStyles(size),
					format.design === ArticleDesign.Analysis &&
						underlinedStyles(
							size,
							palette.background.analysisUnderline,
						),
					showLine && lineStyles(palette),
				]}
			>
				<span>
					{kickerText && (
						<Kicker
							text={kickerText}
							palette={palette}
							showPulsingDot={showPulsingDot}
							showSlash={showSlash}
							inCard={true}
						/>
					)}
					{showQuotes && (
						<QuoteIcon colour={palette.text.cardKicker} />
					)}

					<span
						css={css`
							color: ${palette.text.cardHeadline};
						`}
					>
						{headlineText}
					</span>
				</span>
			</h4>
			{byline && showByline && (
				<Byline
					text={byline}
					format={format}
					size={size}
					isCard={true}
				/>
			)}
		</>
	);
};
