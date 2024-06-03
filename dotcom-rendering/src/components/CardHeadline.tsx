import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { FontScaleArgs, FontWeight } from '@guardian/source/foundations';
import {
	between,
	fontWeights,
	from,
	headline,
	remBodySizes,
	space,
	textSans12,
	textSans15,
	textSans17,
	textSans20,
	until,
} from '@guardian/source/foundations';
import { Link, SvgExternal } from '@guardian/source/react-components';
import React from 'react';
import { decidePalette } from '../lib/decidePalette';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import { Byline } from './Byline';
import { Kicker } from './Kicker';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	headlineText: string; // The text shown
	format: ArticleFormat; // Used to decide when to add type specific styles
	containerPalette?: DCRContainerPalette;
	kickerText?: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	size?: SmallHeadlineSize;
	sizeOnMobile?: SmallHeadlineSize;
	byline?: string;
	showByline?: boolean;
	showLine?: boolean; // If true a short line is displayed above, used for sublinks
	linkTo?: string; // If provided, the headline is wrapped in a link
	isDynamo?: true;
	isSublink?: boolean;
	isExternalLink?: boolean;
	isOnwardContent?: boolean;
};

const fontStyles = ({
	size,
	fontWeight,
}: {
	size: SmallHeadlineSize;
	fontWeight?: FontWeight;
}) => {
	const options: FontScaleArgs = {};
	if (fontWeight) options.fontWeight = fontWeight;

	switch (size) {
		case 'ginormous':
			return css`
				${from.desktop} {
					${headline.large(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
					font-size: 50px;
				}
			`;
		case 'huge':
			return css`
				${headline.small(
					options,
				)}; /** TODO (1) - Unknown argument please manually update */
			`;
		case 'large':
			return css`
				${headline.xsmall(
					options,
				)}; /** TODO (1) - Unknown argument please manually update */
			`;
		case 'medium':
			return css`
				${headline.xxsmall(
					options,
				)}; /** TODO (1) - Unknown argument please manually update */
			`;
		case 'small':
			return css`
				${headline.xxxsmall(
					options,
				)}; /** TODO (1) - Unknown argument please manually update */
			`;
		case 'tiny':
			return css`
				${headline.xxxsmall(
					options,
				)}; /** TODO (1) - Unknown argument please manually update */
				font-size: 14px;
			`;
	}
};

const fontStylesOnMobile = ({
	size,
	fontWeight,
}: {
	size: SmallHeadlineSize;
	fontWeight?: FontWeight;
}) => {
	const options: FontScaleArgs = {};
	if (fontWeight) options.fontWeight = fontWeight;

	switch (size) {
		case 'ginormous':
			return css`
				${until.mobileLandscape} {
					${headline.medium(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
				}
				${between.mobileLandscape.and.desktop} {
					${headline.large(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
				}
			`;
		case 'huge':
			return css`
				${until.desktop} {
					${headline.xsmall(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
				}
			`;
		case 'large':
			return css`
				${until.desktop} {
					${headline.xxsmall(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
				}
			`;
		case 'medium':
			return css`
				${until.desktop} {
					${headline.xxxsmall(
						options,
					)}; /** TODO (1) - Unknown argument please manually update */
				}
			`;
		default:
			return undefined;
	}
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
				font-size: ${remBodySizes.xsmall}rem;
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
	font-weight: ${fontWeights.medium};
	line-height: inherit;
	@media (pointer: coarse) {
		min-height: 44px;
	}
	/* This css is used to remove any underline from the kicker but still
	 * have it applied to the headline when the kicker is hovered */
	:hover {
		color: inherit;
		text-decoration: none;
		.show-underline {
			text-underline-offset: -5%;
			text-decoration: underline;
		}
	}
`;

const lineStyles = (
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
) => css`
	padding-top: 1px;
	:before {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		border-top: 1px solid
			${decidePalette(format, containerPalette).border.cardSupporting};

		width: 120px;
		${between.tablet.and.desktop} {
			width: 100px;
		}
	}
`;

const dynamoStyles = css`
	display: block;
	font-weight: ${fontWeights.medium};
	padding: 5px;
`;

export const WithLink = ({
	linkTo,
	children,
	isDynamo,
}: {
	linkTo?: string;
	children: React.ReactNode;
	isDynamo?: true;
}) => {
	if (linkTo) {
		return (
			<Link
				href={linkTo}
				cssOverrides={
					isDynamo ? [sublinkStyles, dynamoStyles] : sublinkStyles
				}
			>
				{children}
			</Link>
		);
	}
	return <>{children}</>;
};

/** Matches headlines starting with short words of 1 to 3 letters followed by a space */
const isFirstWordShort = /^(\w{1,3}) \b/;

export const CardHeadline = ({
	headlineText,
	format,
	containerPalette,
	showQuotes,
	kickerText,
	showPulsingDot,
	hideLineBreak,
	size = 'medium',
	sizeOnMobile,
	byline,
	showByline,
	showLine,
	linkTo,
	isDynamo,
	isSublink,
	isExternalLink,
	isOnwardContent = false,
}: Props) => {
	const kickerColour = palette('--card-kicker-text');
	const cleanHeadLineText = headlineText.match(isFirstWordShort)
		? headlineText.replace(' ', ' ') // from regular to non-breaking space
		: headlineText;
	return (
		<>
			<h3
				css={[
					format.theme === ArticleSpecial.Labs
						? labTextStyles(size)
						: fontStyles({
								size,
								fontWeight: 'medium',
						  }),
					format.theme !== ArticleSpecial.Labs &&
						fontStylesOnMobile({
							size: sizeOnMobile ?? size,
							fontWeight: 'medium',
						}),
					showLine &&
						!isDynamo &&
						lineStyles(format, containerPalette),
				]}
			>
				<WithLink linkTo={linkTo} isDynamo={isDynamo}>
					{!!kickerText && (
						<Kicker
							text={kickerText}
							color={
								showPulsingDot
									? palette('--kicker-text-with-pulsing-dot')
									: kickerColour
							}
							backgroundColor={palette(
								'--kicker-background-with-pulsing-dot',
							)}
							isSublink={isSublink}
							showPulsingDot={showPulsingDot}
							pulsingDotColor={palette('--kicker-pulsing-dot')}
							hideLineBreak={hideLineBreak}
						/>
					)}
					{showQuotes && <QuoteIcon colour={kickerColour} />}
					<span
						css={css`
							color: ${isOnwardContent
								? palette('--card-headline-onward-content-text')
								: palette('--card-headline-trail-text')};
						`}
						className="show-underline"
					>
						{cleanHeadLineText}
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
				</WithLink>
			</h3>
			{!!byline && showByline && (
				<Byline text={byline} format={format} size={size} />
			)}
		</>
	);
};
