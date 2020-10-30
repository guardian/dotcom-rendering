import React from 'react';
import { css, cx } from 'emotion';

import {
    headline,
    textSans,
    body,
    titlepiece,
} from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette, opinion } from '@guardian/src-foundations';
// import { space, palette, opinion, remSpace } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { Lines } from '@guardian/src-ed-lines';
import { cmp } from '@guardian/consent-management-platform';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { SignInGateProps } from '../types';

const signinGate = css`
    background-color: #eaf1fd;

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

const headingStyles = css`
    ${titlepiece.small({})};
    border-top: 2px ${palette.brandText.ctaPrimary} solid;
    padding-bottom: 42px;
    color: ${palette.brandText.ctaPrimary};

    ${from.phablet} {
        padding-right: 160px;
        ${headline.medium({ fontWeight: 'bold' })};
    }
`;

const bodyBold = css`
    ${body.medium({ fontWeight: 'bold' })}
    padding-bottom: 20px;
    color: ${palette.brandText.ctaPrimary};
    ${from.phablet} {
        padding-right: 110px;
    }
`;

const leftMarginFill = css`
    padding-left: 20px !important;
    margin-left: -20px !important;
    ${from.leftCol} {
        padding-left: 10px !important;
        margin-left: -10px !important;
    }
`;

const lineColor = css`
    color: rgba(5, 41, 98, 0.2);
`;

const lineTop = css`
    border-top: 1px solid rgba(5, 41, 98, 0.2);
`;

const bodyText = css`
    ${textSans.medium({ lineHeight: 'regular' })}
    padding-bottom: ${space[6]}px;

    ${from.phablet} {
        padding-right: 160px;
    }
`;

const signInHeader = css`
    padding-bottom: ${space[2]}px;
`;

const actionButtons = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 42px;

    > a {
        margin-right: ${space[9]}px !important;
        text-decoration: none !important;
    }
`;

const registerButton = css`
    color: ${palette.text.ctaPrimary} !important;
`;

const laterButton = css`
    color: ${palette.brand[400]} !important;
`;

const signInLinkSection = css`
    padding-bottom: ${space[9]}px;
    line-height: ${space[2]}px;
    > a {
    }
`;

const faq = css`
    padding-top: ${space[3]}px;
    padding-bottom: 18px;

    & a {
        color: ${palette.brandText.ctaPrimary};
        display: block;
        margin-bottom: ${space[4]}px;
    }

    & a:hover {
        color: ${palette.brandText.ctaPrimary};
    }
`;

const privacyLink = css`
    text-decoration: underline;
    border: 0;
    background: transparent;
    font-size: inherit;
    padding: 0;
    cursor: pointer;
`;

const firstParagraphOverlay = (isComment: boolean) => css`
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
const hideElementsCss = `
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

// Slight colour highlight
export const SignInGateDesignOptVar5 = ({
    signInUrl,
    guUrl,
    dismissGate,
    abTest,

    ophanComponentId,
    isComment,
}: SignInGateProps) => {
    return (
        <div
            className={cx([signinGate, leftMarginFill])}
            data-cy="sign-in-gate-design-opt-variant-5"
        >
            <style>{hideElementsCss}</style>
            <div className={firstParagraphOverlay(!!isComment)} />
            <h1 className={cx([headingStyles, leftMarginFill])}>
                Register for free and continue reading
            </h1>
            {/* TODO leftMargin fill not working - see Source documentation:
            https://www.theguardian.design/2a1e5182b/p/2619e3-overriding-styles
            cssOverrides don't work either */}
            <div className={cx([lineColor, leftMarginFill])}>
                <Lines count={4} effect="straight" />
            </div>
            <p className={bodyBold}>
                It’s important to say this is not a step towards a paywall
            </p>
            <p className={bodyText}>
                Registering is a free and simple way to help us sustain our
                independent Guardian journalism.
            </p>
            <p className={bodyText}>
                When you register with us we are able to improve our news
                experience for you and for others. You will always be able to
                control your own&nbsp;
                <button
                    data-cy="sign-in-gate-design-opt-variant-5_privacy"
                    className={privacyLink}
                    onClick={() => {
                        cmp.showPrivacyManager();
                        trackLink(ophanComponentId, 'privacy', abTest);
                    }}
                >
                    privacy settings
                </button>
                . Thank you
            </p>
            <div className={actionButtons}>
                <LinkButton
                    data-cy="sign-in-gate-design-opt-variant-5_register"
                    className={registerButton}
                    priority="primary"
                    size="small"
                    href={signInUrl}
                    onClick={() => {
                        trackLink(ophanComponentId, 'register-link', abTest);
                    }}
                >
                    Register for free
                </LinkButton>

                <LinkButton
                    data-cy="sign-in-gate-design-opt-variant-5_dismiss"
                    className={laterButton}
                    priority="subdued"
                    size="small"
                    onClick={() => {
                        dismissGate();
                        trackLink(ophanComponentId, 'not-now', abTest);
                    }}
                >
                    I’ll do it later
                </LinkButton>
            </div>
            <div className={signInLinkSection}>
                <p
                    className={cx([
                        bodyBold,
                        signInHeader,
                        lineTop,
                        leftMarginFill,
                    ])}
                >
                    Have a subscription? Made a contribution? Already
                    registered?
                </p>

                <Link
                    data-cy="sign-in-gate-design-opt-variant-5_signin"
                    href={signInUrl}
                    onClick={() => {
                        trackLink(ophanComponentId, 'sign-in-link', abTest);
                    }}
                >
                    Sign In
                </Link>
            </div>
            <div className={faq}>
                <Link
                    href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
                    onClick={() => {
                        trackLink(ophanComponentId, 'how-link', abTest);
                    }}
                >
                    Why register & how does it help?
                </Link>

                <Link
                    href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
                    onClick={() => {
                        trackLink(ophanComponentId, 'why-link', abTest);
                    }}
                >
                    How will my information & data be used?
                </Link>

                <Link
                    href={`${guUrl}/help/identity-faq`}
                    onClick={() => {
                        trackLink(ophanComponentId, 'help-link', abTest);
                    }}
                >
                    Get help with registering or signing in
                </Link>
            </div>
        </div>
    );
};
