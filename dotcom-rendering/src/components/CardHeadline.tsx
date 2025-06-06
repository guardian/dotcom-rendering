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
import type { PodcastSeriesImage } from '../types/tag';
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
	kickerImage?: PodcastSeriesImage;
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
	/** Line height for sans style headlines for labs is overridden to match that of other headlines (1.15) */
	textSans: {
		xxxlarge: `${textSans20}\n\tline-height: 1.15;\n`,
		xxlarge: `${textSans20}\n\tline-height: 1.15;\n`,
		xlarge: `${textSans20}\n\tline-height: 1.15;\n`,
		large: `${textSans20}\n\tline-height: 1.15;\n`,
		medium: `${textSans20}\n\tline-height: 1.15;\n`,
		small: `${textSans20}\n\tline-height: 1.15;\n`,
		xsmall: `${textSans20}\n\tline-height: 1.15;\n`,
		xxsmall: `${textSans17}\n\tline-height: 1.15;\n`,
		xxxsmall: `${textSans15}\n\tline-height: 1.15;\n`,
		tiny: `${textSans12}\n\tline-height: 1.15;\n`,
	},
} as const;

export enum FontFamily {
	HeadlineMedium = 'headlineMedium',
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

const getFonts = (format: ArticleFormat, fontSizes: ResponsiveFontSize) => {
	if (format.theme === ArticleSpecial.Labs) {
		return getFontSize(fontSizes, FontFamily.TextSans);
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
	kickerImage,
}: Props) => {
	// The link is only applied directly to the headline if it is a sublink
	const isSublink = !!linkTo;

	const fontStyles = getFonts(format, fontSizes);

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
						image={kickerImage}
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
