import { css } from '@emotion/react';
import { opinion, palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline, textSans } from '@guardian/src-foundations/typography';

export const signInGateContainer = css`
	max-width: 617px;

	${from.desktop} {
		min-height: 600px;
	}

	/* This needs to be here because link styles are applied globally to the article body :/ */
	a {
		text-decoration: underline;
		border-bottom: none;
		color: ${palette.text.primary};

		:hover {
			border-bottom: none;
		}
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

export const bodyBold = css`
	${textSans.medium({ fontWeight: 'bold' })}
	border-top: 1px ${palette.line.primary} solid;
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
		margin-right: ${space[9]}px !important;
		text-decoration: none !important;
	}
`;

export const registerButton = css`
	color: ${palette.text.ctaPrimary} !important;
`;

export const laterButton = css`
	color: ${palette.brand[400]} !important;
`;

export const signInLink = css`
	color: ${palette.text.anchorPrimary} !important;
`;

export const faq = css`
	padding-top: ${space[3]}px;
	padding-bottom: 18px;
	margin-top: ${space[5]}px;

	& a {
		color: ${palette.text.primary};
		display: block;
		margin-bottom: ${space[4]}px;
	}

	& a:hover {
		color: ${palette.text.primary};
	}
`;

export const privacyLink = css`
	text-decoration: underline;
	border: 0;
	background: transparent;
	font-size: inherit;
	padding: 0;
	cursor: pointer;
`;

export const firstParagraphOverlay = (isComment: boolean) => css`
	margin-top: -250px;
	width: 100%;
	height: 250px;
	position: absolute;

	/* "transparent" only works here because == rgba(0,0,0,0) */
	background-image: linear-gradient(
		0deg,
		${isComment ? opinion[800] : palette.background.primary},
		70%,
		rgba(255, 255, 255, 0)
	);
`;

// This css does 3 things
// 1. first hide all article conent using display: none; (.article-body-commercial-selector > *)
// 2. make the sign in gate ((#sign-in-gate), and the first 2 paragraphs of the article visible (.article-body-commercial-selector p:nth-of-type(-n+3))
// 3. hide any siblings after the sign in gate incase because of the css in 2
//    a paragraph is still visible (#sign-in-gate ~ *)
export const hideElementsCss = `
    .article-body-commercial-selector > * {
        display: none;
    }

    #sign-in-gate, .article-body-commercial-selector p:nth-of-type(-n + 3) {
        display: block;
    }

    #sign-in-gate ~ * {
        display: none;
    }

    #slot-body-end {
        display: none;
    }
`;
