import { css } from '@emotion/react';
import { type ArticleFormat, ArticleSpecial } from '@guardian/libs';
import {
	between,
	from,
	headlineMedium14,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	headlineMedium50,
	space,
	textSans12,
	textSans15,
	textSans17,
	textSans20,
	until,
} from '@guardian/source/foundations';
import { Link, SvgExternal } from '@guardian/source/react-components';
import React from 'react';
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
	hideLineBreak?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	size?: SmallHeadlineSize;
	sizeOnMobile?: SmallHeadlineSize;
	byline?: string;
	showByline?: boolean;
	linkTo?: string; // If provided, the headline is wrapped in a link
	isExternalLink?: boolean;
};

const fontStyles = ({ size }: { size: SmallHeadlineSize }) => {
	switch (size) {
		case 'ginormous':
			return css`
				${from.desktop} {
					${headlineMedium50}
				}
			`;
		case 'huge':
			return css`
				${headlineMedium28}
			`;
		case 'large':
			return css`
				${headlineMedium24}
			`;
		case 'medium':
			return css`
				${headlineMedium20}
			`;
		case 'small':
			return css`
				${headlineMedium17}
			`;
		case 'tiny':
			return css`
				${headlineMedium14}
			`;
	}
};

const fontStylesOnMobile = ({ size }: { size: SmallHeadlineSize }) => {
	switch (size) {
		case 'ginormous':
			return css`
				${until.mobileLandscape} {
					${headlineMedium34}
				}
				${between.mobileLandscape.and.desktop} {
					${headlineMedium42}
				}
			`;
		case 'huge':
			return css`
				${until.desktop} {
					${headlineMedium24}
				}
			`;
		case 'large':
			return css`
				${until.desktop} {
					${headlineMedium20}
				}
			`;
		case 'medium':
			return css`
				${until.desktop} {
					${headlineMedium17}
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
	@media (pointer: coarse) {
		min-height: 44px;
	}

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

/** Matches headlines starting with short words of 1 to 3 letters followed by a space */
const isFirstWordShort = /^(\w{1,3}) \b/;

export const CardHeadline = ({
	headlineText,
	format,
	showQuotes,
	kickerText,
	showPulsingDot,
	hideLineBreak,
	size = 'medium',
	sizeOnMobile,
	byline,
	showByline,
	linkTo,
	isExternalLink,
}: Props) => {
	const kickerColour = palette('--card-kicker-text');
	const cleanHeadLineText = headlineText.match(isFirstWordShort)
		? headlineText.replace(' ', ' ') // from regular to non-breaking space
		: headlineText;
	return (
		<WithLink linkTo={linkTo}>
			<h3
				className={`${
					linkTo ? 'card-sublink-headline' : 'card-headline'
				}`}
				css={[
					format.theme === ArticleSpecial.Labs
						? labTextStyles(size)
						: fontStyles({ size }),
					format.theme !== ArticleSpecial.Labs &&
						fontStylesOnMobile({
							size: sizeOnMobile ?? size,
						}),
				]}
			>
				{!!kickerText && (
					<span
						style={
							hideLineBreak
								? { display: 'inline', marginRight: '4px' }
								: { display: 'block' }
						}
					>
						<Kicker
							text={kickerText}
							color={kickerColour}
							showPulsingDot={showPulsingDot}
						/>
					</span>
				)}
				{showQuotes && <QuoteIcon colour={kickerColour} />}
				<span
					css={css`
						color: ${palette('--card-headline-trail-text')};
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
			</h3>
			{!!byline && showByline && (
				<Byline
					text={byline}
					isLabs={format.theme === ArticleSpecial.Labs}
					size={size}
				/>
			)}
		</WithLink>
	);
};
