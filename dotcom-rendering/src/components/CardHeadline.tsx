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
import type { SmallHeadlineSize } from '../types/layout';
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
	/** Optional override of the standard card headline colour */
	headlineColour?: string;
	/** Optional override of the standard card kicker colour */
	kickerColour?: string;
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

export type HeadlineSize = keyof typeof headlineSize;
export type TextSansSize = keyof typeof textSansSize;

export type ResponsiveFontSize = {
	desktop: HeadlineSize;
	tablet?: HeadlineSize;
	mobile?: HeadlineSize;
	mobileMedium?: HeadlineSize;
};

const getFontSize = (
	sizes: ResponsiveFontSize,
	family: 'headline' | 'textSans',
) => {
	const { desktop, tablet, mobileMedium, mobile } = sizes;

	const fontSize = family === 'headline' ? headlineSize : textSansSize;

	return css`
		${fontSize[desktop]};

		${tablet &&
		css`
			${until.desktop} {
				${fontSize[tablet]};
			}
		`}

		${mobile &&
		css`
			${until.tablet} {
				${fontSize[mobile]};
			}
		`}

		${mobileMedium &&
		css`
			${between.mobileMedium.and.tablet} {
				${fontSize[mobileMedium]};
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

/**
 * The Byline component uses a different type to determine font sizes but infers the size from the desktop headline size.
 * This function converts the headline size to the appropriate byline size.
 */
const getBylineFontSizes = (size: HeadlineSize): SmallHeadlineSize => {
	switch (size) {
		case 'xxlarge':
			return 'ginormous';
		case 'medium':
			return 'huge';
		case 'small':
			return 'large';
		case 'xsmall':
			return 'medium';
		case 'xxsmall':
			return 'small';
		case 'tiny':
			return 'tiny';
		default:
			return 'medium';
	}
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
}: Props) => {
	// The link is only applied directly to the headline if it is a sublink
	const isSublink = !!linkTo;

	const fonts =
		format.theme === ArticleSpecial.Labs
			? getFontSize(fontSizes, 'textSans')
			: getFontSize(fontSizes, 'headline');

	const bylineSize = getBylineFontSizes(fontSizes.desktop);

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
						: fonts,
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
					isLabs={format.theme === ArticleSpecial.Labs}
					size={bylineSize}
					colour={kickerColour}
				/>
			)}
		</WithLink>
	);
};
