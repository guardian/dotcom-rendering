import { css } from '@emotion/react';
import {
	from,
	headline,
	line,
	palette,
	space,
	text,
	textSans,
} from '@guardian/source-foundations';

export const signInGateContainer = css`
	max-width: 617px;

	${from.desktop} {
		min-height: 600px;
	}
`;

export const headingStyles = css`
	${headline.small({ fontWeight: 'bold' })};
	border-top: 2px black solid;
	padding-bottom: ${space[12]}px;

	${from.phablet} {
		padding-right: 160px;
		${headline.medium({ fontWeight: 'bold' })};
	}
`;

export const bodySeparator = css`
	border-top: 1px ${line.primary} solid;
`;

export const bodyBold = css`
	${textSans.medium({ fontWeight: 'bold' })}
	padding-bottom: 20px;
	${from.phablet} {
		padding-right: 130px;
	}
`;

export const bodyText = css`
	${textSans.medium({ lineHeight: 'regular' })}
	padding-bottom: ${space[6]}px;

	${from.phablet} {
		padding-right: 160px;
	}
`;

export const signInHeader = css`
	padding-bottom: 0;
`;

export const actionButtons = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-bottom: 42px;

	> a {
		/* stylelint-disable-next-line declaration-no-important */
		margin-right: ${space[4]}px !important;

		${from.mobileMedium} {
			/* stylelint-disable-next-line declaration-no-important */
			margin-right: ${space[9]}px !important;
		}

		/* stylelint-disable-next-line declaration-no-important */
		text-decoration: none !important;
	}
`;

export const registerButton = css`
	/* stylelint-disable-next-line declaration-no-important */
	color: ${text.ctaPrimary} !important;
`;

export const laterButton = css`
	/* stylelint-disable-next-line declaration-no-important */
	color: ${palette.brand[400]} !important;
`;

export const signInLink = css`
	/* stylelint-disable-next-line declaration-no-important */
	color: ${text.anchorPrimary} !important;
	/* stylelint-disable-next-line declaration-no-important */
	text-decoration-color: ${line.primary} !important;
	text-underline-position: under;
`;

export const faq = css`
	padding-top: ${space[3]}px;
	padding-bottom: 18px;
	margin-top: ${space[5]}px;

	& a {
		color: ${text.anchorPrimary};
		display: block;
		margin-bottom: ${space[4]}px;
		text-decoration-color: ${line.primary};
		text-underline-position: under;
	}

	& a:hover {
		color: ${text.anchorPrimary};
	}
`;

export const privacyLink = css`
	color: ${text.anchorPrimary};
	text-decoration: underline;
	text-decoration-color: ${line.primary};
	text-underline-position: under;
	border: 0;
	background: transparent;
	/* stylelint-disable-next-line property-disallowed-list */
	font-family: inherit;
	font-size: inherit;
	padding: 0;
	cursor: pointer;
`;

export const firstParagraphOverlay = css`
	margin-top: -250px;
	width: 100%;
	height: 250px;
	position: absolute;
`;

/**
 * This CSS hides everything in an article, except the first two paragraphs and
 * the sign-in gate. The order in which rules are laid out matters.
 */
export const hideElementsCss = [
	// 1. hide all article content
	`.article-body-commercial-selector > * {
        display: none;
    }`,
	// 2. make the sign in gate and the first 2 paragraphs of the article visible
	`#sign-in-gate, .article-body-commercial-selector p:nth-of-type(-n + 3) {
        display: block;
    }`,
	// 3. mask the first and second with a gradient overlay
	`.article-body-commercial-selector > p:nth-of-type(1) {
        -webkit-mask-image: linear-gradient(black, rgba(0, 0, 0, 0.5));
        mask-image: linear-gradient(black, rgba(0, 0, 0, 0.5));
    }
	.article-body-commercial-selector > p:nth-of-type(2) {
        -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
        mask-image: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
    }
	`,
	// 4. hide any siblings after the sign in gate in case a paragraph
	// is still visible because of the CSS in 2
	`#sign-in-gate ~ * {
        display: none;
    }`,
	`#slot-body-end {
        display: none;
    }`,
].join('\n');
