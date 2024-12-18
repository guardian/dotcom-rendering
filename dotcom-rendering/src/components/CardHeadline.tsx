import { css } from '@emotion/react';
import {
	between,
	headlineLight14,
	headlineLight15,
	headlineLight17,
	headlineLight20,
	headlineLight24,
	headlineLight28,
	headlineLight34,
	headlineLight42,
	headlineLight50,
	headlineLight64,
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
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import { PodcastSeriesImage } from '../types/tag';
import { Byline } from './Byline';
import { Kicker } from './Kicker';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	/** The text shown */
	headlineText: string;
	/** Used to decide when to add type specific styles */
	format: ArticleFormat;
	kickerText?: string;
	showPulsingDot?: boolean;
	hasInlineKicker?: boolean;
	/** Even with design !== Comment, a piece can be opinion */
	showQuotes?: boolean;
	fontSizes?: ResponsiveFontSize;
	byline?: string;
	showByline?: boolean;
	/** If provided, the headline is wrapped in a link */
	linkTo?: string;
	isExternalLink?: boolean;
	/** Optional override of the standard card headline colour */
	headlineColour?: string;
	/** Optional override of the standard card kicker colour */
	kickerColour?: string;
	isBetaContainer?: boolean;
	accentImage?: PodcastSeriesImage;
};

const sublinkStyles = css`
	display: block;
	/* See: https://css-tricks.com/nested-links/ */
	z-index: ${getZIndex('card-nested-link')};
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

/** These represent the font groups used by card headline */
const fontFamilies = {
	headlineMedium: {
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
	},
	headlineLight: {
		xxxlarge: headlineLight64,
		xxlarge: headlineLight50,
		xlarge: headlineLight42,
		large: headlineLight34,
		medium: headlineLight28,
		small: headlineLight24,
		xsmall: headlineLight20,
		xxsmall: headlineLight17,
		xxxsmall: headlineLight15,
		tiny: headlineLight14,
	},
	textSans: {
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
	},
} as const;

export enum FontFamily {
	HeadlineMedium = 'headlineMedium',
	HeadlineLight = 'headlineLight',
	TextSans = 'textSans',
}

export type HeadlineSize = keyof typeof fontFamilies.headlineMedium;

export type ResponsiveFontSize = {
	desktop: HeadlineSize;
	tablet?: HeadlineSize;
	mobile?: HeadlineSize;
	mobileMedium?: HeadlineSize;
};

const getFontSize = (sizes: ResponsiveFontSize, family: FontFamily) => {
	const font = fontFamilies[family];

	const { desktop, tablet, mobileMedium, mobile } = sizes;

	return css`
		${font[desktop]};

		${tablet &&
		css`
			${until.desktop} {
				${font[tablet]};
			}
		`}

		${mobile &&
		css`
			${until.tablet} {
				${font[mobile]};
			}
		`}

		${mobileMedium &&
		css`
			${between.mobileMedium.and.tablet} {
				${font[mobileMedium]};
			}
		`}
	`;
};

const getFonts = (
	format: ArticleFormat,
	fontSizes: ResponsiveFontSize,
	isBetaContainer: boolean,
) => {
	if (format.theme === ArticleSpecial.Labs) {
		return getFontSize(fontSizes, FontFamily.TextSans);
	}

	if (
		isBetaContainer &&
		/** Any of these designs are considered an "opinion" */
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Editorial ||
			format.design === ArticleDesign.Letter)
	) {
		return getFontSize(fontSizes, FontFamily.HeadlineLight);
	}

	return getFontSize(fontSizes, FontFamily.HeadlineMedium);
};

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
	/** headline medium 20 on desktop and headline medium 17 on tablet and mobile */
	fontSizes = { desktop: 'xsmall', tablet: 'xxsmall', mobile: 'xxsmall' },
	byline,
	showByline,
	linkTo,
	isExternalLink,
	headlineColour = palette('--card-headline'),
	kickerColour = palette('--card-kicker-text'),
	isBetaContainer = false,
	accentImage,
}: Props) => {
	// The link is only applied directly to the headline if it is a sublink
	const isSublink = !!linkTo;

	const fontStyles = getFonts(format, fontSizes, isBetaContainer);

	return (
		<WithLink linkTo={linkTo}>
			<h3
				className={`${
					isSublink ? 'card-sublink-headline' : 'card-headline'
				}`}
				css={[
					isSublink
						? css`
								${textSans14}
						  `
						: fontStyles,
				]}
			>
				{!!kickerText && (
					<Kicker
						text={kickerText}
						color={kickerColour}
						showPulsingDot={showPulsingDot}
						isInline={hasInlineKicker}
						accentImage={accentImage}
					/>
				)}
				{showQuotes && <QuoteIcon colour={kickerColour} />}
				<span
					css={css`
						color: ${headlineColour};
					`}
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
					colour={kickerColour}
					fontStyles={fontStyles}
				/>
			)}
		</WithLink>
	);
};
