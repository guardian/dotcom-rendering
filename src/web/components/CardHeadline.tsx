import React from 'react';
import { css } from '@emotion/react';

import { Design } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { until } from '@guardian/src-foundations/mq';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';
import { Byline } from '@root/src/web/components/Byline';
import { space } from '@guardian/src-foundations';

type Props = {
	headlineText: string; // The text shown
	format: Format; // Used to decide when to add type specific styles
	palette: Palette; // Used to colour the headline and the kicker
	kickerText?: string;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	size?: SmallHeadlineSize;
	byline?: string;
	showByline?: boolean;
	isFullCardImage?: boolean; // Used for carousel AB test
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

const underlinedStyles = (size: SmallHeadlineSize) => {
	function generateUnderlinedCss(baseSize: number) {
		return css`
			background-image: linear-gradient(
				to bottom,
				transparent,
				transparent ${baseSize - 1}px,
				rgba(199, 0, 0, 0.5)
			);
			line-height: ${baseSize - 1}px;
			background-size: 1px ${baseSize}px;
			background-origin: content-box;
			background-clip: content-box;
			margin-right: -5px;
		`;
	}
	switch (size) {
		case 'small':
			return generateUnderlinedCss(21);
		case 'medium':
			return generateUnderlinedCss(24);
		case 'large':
			return generateUnderlinedCss(28);
		default:
			return generateUnderlinedCss(23);
	}
};

const fullCardImageTextStyles = css`
	${headline.xxxsmall()};
	color: ${neutral[100]};
	background-color: rgba(0, 0, 0, 0.75);
	box-shadow: -${space[1]}px 0 0 rgba(0, 0, 0, 0.75);
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
	line-height: 1.25;
	white-space: pre-wrap;
`;

export const CardHeadline = ({
	headlineText,
	format,
	palette,
	showQuotes,
	kickerText,
	showPulsingDot,
	showSlash,
	size = 'medium',
	byline,
	showByline,
	isFullCardImage,
}: Props) => (
	<>
		<h4
			css={[
				fontStyles(size),
				format.design === Design.Analysis && underlinedStyles(size),
				isFullCardImage &&
					css`
						line-height: 1; /* Reset line height in full image carousel */
					`,
			]}
		>
			<span css={[isFullCardImage && fullCardImageTextStyles]}>
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
					<QuoteIcon colour={palette.text.cardKicker} size={size} />
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
				design={format.design}
				pillar={format.theme}
				size={size}
			/>
		)}
	</>
);
