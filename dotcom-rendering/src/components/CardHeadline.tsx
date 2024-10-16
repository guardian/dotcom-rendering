import { css } from '@emotion/react';
import {
	headlineMedium14,
	headlineMedium15,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	headlineMedium50,
	headlineMedium64,
	space,
	textSans12,
	textSans14,
	textSans15,
	textSans17,
	textSans20,
	until,
} from '@guardian/source/foundations';
import { Link, SvgExternal } from '@guardian/source/react-components';
import React from 'react';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import { Byline } from './Byline';
import { Kicker } from './Kicker';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	headlineText: string; // The text shown
	format: ArticleFormat; // Used to decide when to add type specific styles
	kickerText?: string;
	showPulsingDot?: boolean;
	hasInlineKicker?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	fontSizes?: ResponsiveFontSize;
	byline?: string;
	showByline?: boolean;
	linkTo?: string; // If provided, the headline is wrapped in a link
	isExternalLink?: boolean;
	/** Is the headline inside a Highlights card? */
	isHighlights?: boolean;
	bylineSize?: SmallHeadlineSize;
};

export type CardHeadlineSize =
	| 'ginormousBoosted'
	| 'hugeBoosted'
	| 'largeBoosted'
	| 'mediumBoosted'
	| 'smallBoosted'
	| 'tinyBoosted'
	| 'ginormous'
	| 'huge'
	| 'large'
	| 'medium'
	| 'small'
	| 'tiny';

/** boosted font sizes are the same across all breakpoints so they've been abstracted out to help with readability */
const boostedSizes = {
	ginormousBoosted: headlineMedium64,
	hugeBoosted: headlineMedium50,
	largeBoosted: headlineMedium42,
	mediumBoosted: headlineMedium34,
	smallBoosted: headlineMedium28,
	tinyBoosted: headlineMedium24,
};

const fontSizeMap = (breakpoint: HeadlineBreakpoint) => {
	const baseSizes = {
		desktop: {
			...boostedSizes,
			ginormous: headlineMedium50,
			huge: headlineMedium28,
			large: headlineMedium24,
			medium: headlineMedium20,
			small: headlineMedium17,
			tiny: headlineMedium14,
		},
		tablet: {
			...boostedSizes,
			ginormous: headlineMedium42,
			huge: headlineMedium24,
			large: headlineMedium20,
			medium: headlineMedium17,
			small: headlineMedium15,
			tiny: headlineMedium14,
		},
		mobile: {
			...boostedSizes,
			ginormous: headlineMedium34,
			huge: headlineMedium24,
			large: headlineMedium20,
			medium: headlineMedium17,
			small: headlineMedium15,
			tiny: headlineMedium14,
		},
	};

	return baseSizes[breakpoint];
};

export type ResponsiveFontSize = {
	desktop: CardHeadlineSize;
	tablet?: CardHeadlineSize;
	mobile?: CardHeadlineSize;
};

type HeadlineBreakpoint = 'desktop' | 'tablet' | 'mobile';

const getFontSize = (fontSize: ResponsiveFontSize) => {
	return css`
		${fontSizeMap('desktop')[fontSize.desktop]};

		${fontSize.tablet &&
		css`
			${until.desktop} {
				${fontSizeMap('tablet')[fontSize.tablet]};
			}
		`}
		${fontSize.mobile &&
		css`
			${until.tablet} {
				${fontSizeMap('mobile')[fontSize.mobile]};
			}
		`}
	`;
};

const labTextStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
		case 'large':
			return css`
				${textSans20};
				${until.desktop} {
					${textSans17};
				}
			`;
		case 'medium':
			return css`
				${textSans20};
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				line-height: 1.15;
				${until.desktop} {
					${textSans17};
					/**
					 * Typography preset styles should not be overridden.
					 * This has been done because the styles do not directly map to the new presets.
					 * Please speak to your team's designer and update this to use a more appropriate preset.
					 */
					line-height: 1.15;
				}
				padding-bottom: ${space[1]}px;
			`;
		case 'small':
			return css`
				${textSans15};
			`;
		case 'tiny':
			return css`
				${textSans12};
			`;
	}
};

const sublinkStyles = css`
	display: block;
	/* See: https://css-tricks.com/nested-links/ */
	${getZIndex('card-nested-link')}
	/* The following styles turn off those provided by Link */
	color: inherit;
	text-decoration: none;
	/* stylelint-disable-next-line property-disallowed-list */
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;

	/* This css is used to remove any underline from the kicker but still
	 * have it applied to the headline when the kicker is hovered */
	:hover {
		color: inherit;
		text-decoration: none;
		.show-underline {
			text-decoration: underline;
			text-underline-offset: auto;
			text-underline-position: auto;
		}
	}
`;

export const WithLink = ({
	linkTo,
	children,
}: {
	linkTo?: string;
	children: React.ReactNode;
}) => {
	if (linkTo) {
		return (
			<Link href={linkTo} cssOverrides={sublinkStyles}>
				{children}
			</Link>
		);
	}
	return <>{children}</>;
};

export const CardHeadline = ({
	headlineText,
	format,
	showQuotes,
	kickerText,
	showPulsingDot,
	hasInlineKicker,
	fontSizes = { desktop: 'medium' },
	byline,
	showByline,
	linkTo,
	isExternalLink,
	isHighlights = false,
	bylineSize = 'medium',
}: Props) => {
	const kickerColour = isHighlights
		? palette('--highlights-card-kicker-text')
		: palette('--card-kicker-text');

	// The link is only applied directly to the headline if it is a sublink
	const isSublink = !!linkTo;
	console.log(headlineText, fontSizes);
	const fonts = getFontSize(fontSizes);
	return (
		<WithLink linkTo={linkTo}>
			<h3
				className={`${
					isSublink ? 'card-sublink-headline' : 'card-headline'
				}`}
				css={[
					fonts,

					/** TODO - reimplement labs styles */
					// labTextStyles,

					isSublink &&
						fontSizes.desktop === 'medium' &&
						css`
							${textSans14}
						`,
				]}
			>
				{!!kickerText && (
					<Kicker
						text={kickerText}
						color={kickerColour}
						showPulsingDot={showPulsingDot}
						isInline={hasInlineKicker}
					/>
				)}
				{showQuotes && <QuoteIcon colour={kickerColour} />}
				<span
					css={[
						css`
							color: ${isHighlights
								? palette('--highlights-card-headline')
								: palette('--card-headline')};
						`,
					]}
					className="show-underline"
				>
					{headlineText}
					{isExternalLink && (
						<span
							css={css`
								stroke: red;
							`}
						>
							<SvgExternal size="xsmall" />
						</span>
					)}
				</span>
			</h3>
			{!!byline && showByline && (
				<Byline
					text={byline}
					isLabs={format.theme === ArticleSpecial.Labs}
					size={bylineSize}
				/>
			)}
		</WithLink>
	);
};
