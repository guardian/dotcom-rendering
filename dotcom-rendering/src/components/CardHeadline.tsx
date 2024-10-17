import { css } from '@emotion/react';
import {
	between,
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

const headlineSize = {
	xxxlarge: headlineMedium64,
	xxlarge: headlineMedium50,
	xlarge: headlineMedium42,
	large: headlineMedium34,
	medium: headlineMedium28,
	small: headlineMedium24,
	xsmall: headlineMedium20,
	xxsmall: headlineMedium17,
	xxxsmall: headlineMedium15,
	tiny: headlineMedium14,
};

export type HeadlineSize = keyof typeof headlineSize;

export type ResponsiveFontSize = {
	desktop: HeadlineSize;
	tablet?: HeadlineSize;
	mobile?: HeadlineSize;
	mobileMedium?: HeadlineSize;
};

const getFontSize = ({
	desktop,
	tablet,
	mobileMedium,
	mobile,
}: ResponsiveFontSize) => {
	return css`
		${headlineSize[desktop]};

		${tablet &&
		css`
			${until.desktop} {
				${headlineSize[tablet]};
			}
		`}

		${mobile &&
		css`
			${until.tablet} {
				${headlineSize[mobile]};
			}
		`}

		${mobileMedium &&
		css`
			${between.mobileMedium.and.tablet} {
				${headlineSize[mobileMedium]};
			}
		`}
	`;
};

const textSansSize = {
	xxxlarge: textSans20,
	xxlarge: textSans20,
	xlarge: textSans20,
	large: textSans20,
	medium: textSans20,
	small: textSans20,
	xsmall: textSans20,
	xxsmall: textSans17,
	xxxsmall: textSans15,
	tiny: textSans12,
};

const getLabSize = ({
	desktop,
	tablet,
	mobileMedium,
	mobile,
}: ResponsiveFontSize) => {
	return css`
		${textSansSize[desktop]};

		${tablet &&
		css`
			${until.desktop} {
				${textSansSize[tablet]};
			}
		`}

		${mobile &&
		css`
			${until.tablet} {
				${textSansSize[mobile]};
			}
		`}

		${mobileMedium &&
		css`
			${between.mobileMedium.and.tablet} {
				${textSansSize[mobileMedium]};
			}
		`}
	`;
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
	fontSizes = { desktop: 'xsmall' },
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
	const fonts =
		format.theme === ArticleSpecial.Labs
			? getLabSize(fontSizes)
			: getFontSize(fontSizes);

	if (format.theme === ArticleSpecial.Labs) {
		console.log(fontSizes);
	}
	return (
		<WithLink linkTo={linkTo}>
			<h3
				className={`${
					isSublink ? 'card-sublink-headline' : 'card-headline'
				}`}
				css={[
					fonts,
					isSublink &&
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

/** MOBILE FIRST APPROACH */
// const getFontSize = ({
// 	desktop,
// 	tablet,
// 	mobileMedium,
// 	mobile,
// }: ResponsiveFontSize) => {
// 	return css`
// 		${headlineSize[mobile]};

// 		${mobileMedium &&
// 		css`
// 			${between.mobileMedium.and.tablet} {
// 				${headlineSize[mobileMedium]};
// 			}
// 		`}

// 		${tablet &&
// 		css`
// 			${between.tablet.and.desktop} {
// 				${headlineSize[tablet]};
// 			}
// 		`}

// 		${desktop &&
// 		css`
// 			${from.desktop} {
// 				${headlineSize[desktop]};
// 			}
// 		`}
// 	`;
// };

// { desktop: 'xsmall', mobile: 'xxsmall' } ==> medium, small
// 		(desktop) => (xsmall) => textSans20;
// 		(tablet) => textSans17;
// 		(mobile) => textSans15;
// // { desktop: 'xxsmall'} ==> small
// 	${textSans15}

// const labTextStyles = (size: SmallHeadlineSize) => {
// 	switch (size) {
// 		case 'ginormous':
// 		case 'huge':
// 		case 'large':
// 			return css`
// 				${textSans20};
// 				${until.desktop} {
// 					${textSans17};
// 				}
// 			`;
// 		case 'medium':
// 			return css`
// 				${textSans20};
// 				/**
// 				 * Typography preset styles should not be overridden.
// 				 * This has been done because the styles do not directly map to the new presets.
// 				 * Please speak to your team's designer and update this to use a more appropriate preset.
// 				 */
// 				line-height: 1.15;
// 				${until.desktop} {
// 					${textSans17};
// 					/**
// 					 * Typography preset styles should not be overridden.
// 					 * This has been done because the styles do not directly map to the new presets.
// 					 * Please speak to your team's designer and update this to use a more appropriate preset.
// 					 */
// 					line-height: 1.15;
// 				}
// 				padding-bottom: ${space[1]}px;
// 			`;
// 		case 'small':
// 			return css`
// 				${textSans15};
// 			`;
// 		case 'tiny':
// 			return css`
// 				${textSans12};
// 			`;
// 	}
// };
