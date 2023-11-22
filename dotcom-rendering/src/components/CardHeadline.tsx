import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { FontScaleArgs, FontWeight } from '@guardian/source-foundations';
import {
	between,
	fontWeights,
	from,
	headline,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Link, SvgExternal } from '@guardian/source-react-components';
import React from 'react';
import { decidePalette } from '../lib/decidePalette';
import { getZIndex } from '../lib/getZIndex';
import { palette as schemedPalette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';
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
	isExternalLink?: boolean;
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
					${headline.large(options)};
					font-size: 50px;
				}
			`;
		case 'huge':
			return css`
				${headline.small(options)};
			`;
		case 'large':
			return css`
				${headline.xsmall(options)};
			`;
		case 'medium':
			return css`
				${headline.xxsmall(options)};
			`;
		case 'small':
			return css`
				${headline.xxxsmall(options)};
			`;
		case 'tiny':
			return css`
				${headline.xxxsmall(options)};
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
					${headline.medium(options)};
				}
				${between.mobileLandscape.and.desktop} {
					${headline.large(options)};
				}
			`;
		case 'huge':
			return css`
				${until.desktop} {
					${headline.xsmall(options)};
				}
			`;
		case 'large':
			return css`
				${until.desktop} {
					${headline.xxsmall(options)};
				}
			`;
		case 'medium':
			return css`
				${until.desktop} {
					${headline.xxxsmall(options)};
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

const lineStyles = (palette: Palette) => css`
	padding-top: 1px;
	:before {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		border-top: 1px solid ${palette.border.cardSupporting};

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
	isExternalLink,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	const kickerColour = isDynamo
		? palette.text.dynamoKicker
		: palette.text.cardKicker;
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
					showLine && !isDynamo && lineStyles(palette),
				]}
			>
				<WithLink linkTo={linkTo} isDynamo={isDynamo}>
					{!!kickerText && (
						<>
							<Kicker
								text={kickerText}
								color={kickerColour}
								showPulsingDot={showPulsingDot}
								hideLineBreak={hideLineBreak}
							/>
						</>
					)}
					{showQuotes && <QuoteIcon colour={kickerColour} />}
					<span
						css={css`
							color: ${schemedPalette('--headline-colour')};
						`}
						style={{
							['--headline-colour']: isDynamo
								? palette.text.dynamoHeadline
								: palette.text.cardHeadline,
						}}
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
