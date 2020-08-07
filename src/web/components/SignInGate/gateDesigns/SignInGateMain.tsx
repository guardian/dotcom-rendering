import React, { useState, Suspense } from 'react';
import { css, cx } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette, opinion } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { oldCmp } from '@guardian/consent-management-platform';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { SignInGateProps } from './types';

const signinGate = css`
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

const headingStyles = css`
    ${headline.small({ fontWeight: 'bold' })};
    border-top: 2px black solid;
    padding-bottom: 42px;

    ${from.phablet} {
        padding-right: 160px;
        ${headline.medium({ fontWeight: 'bold' })};
    }
`;

const bodyBold = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    border-top: 1px ${palette.line.primary} solid;
    padding-bottom: 20px;
    ${from.phablet} {
        padding-right: 130px;
    }
`;

const bodyText = css`
    ${textSans.medium({ lineHeight: 'regular' })}
    padding-bottom: ${space[6]}px;

    ${from.phablet} {
        padding-right: 160px;
    }
`;

const signInHeader = css`
    padding-bottom: 0;
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

const signInLink = css`
    color: ${palette.text.anchorPrimary} !important;
`;

const faq = css`
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

// This css hides all the elements in the article after the #sign-in-gate
// using the General sibling combinator https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator
const hideElementsCss = `
    #sign-in-gate ~ * {
        display: none;
    }
    `;

export const SignInGateMain = ({
    signInUrl,
    guUrl,
    dismissGate,
    abTest,
    ophanComponentId,
    isComment,
}: SignInGateProps) => {
    const [showCpmUi, setShowCmpUi] = useState(false);

    return (
        <div className={signinGate} data-cy="sign-in-gate-main">
            <style>{hideElementsCss}</style>
            <div className={firstParagraphOverlay(!!isComment)} />
            <h1 className={headingStyles}>
                Register for free and continue reading
            </h1>
            <p className={bodyBold}>
                It’s important to say this is not a step towards a paywall
            </p>
            <p className={bodyText}>
                We need more readers to register with us to help sustain our
                independent, quality journalism. Without you taking this simple
                step, we miss out on revenues from personalised advertising - a
                critical source of funding for our future.
            </p>
            <p className={bodyText}>
                Through doing so, you&apos;ll help ensure that our reporting
                remains freely available to everyone, and if we recognise you
                when you come back, we can improve your news experience too. You
                can still control your own&nbsp;
                <button
                    data-cy="sign-in-gate-main_privacy"
                    className={privacyLink}
                    onClick={() => {
                        setShowCmpUi(!showCpmUi);
                        trackLink(ophanComponentId, 'privacy', abTest);
                    }}
                >
                    privacy settings
                </button>
                . Thank you
            </p>
            <div className={actionButtons}>
                <LinkButton
                    data-cy="sign-in-gate-main_register"
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
                    data-cy="sign-in-gate-main_dismiss"
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

            <p className={cx([bodyBold, signInHeader])}>
                Have a subscription? Made a contribution? Already registered?
            </p>

            <Link
                data-cy="sign-in-gate-main_signin"
                className={signInLink}
                href={signInUrl}
                onClick={() => {
                    trackLink(ophanComponentId, 'sign-in-link', abTest);
                }}
            >
                Sign In
            </Link>

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
            {showCpmUi && (
                <Suspense fallback={<></>}>
                    <oldCmp.ConsentManagementPlatform
                        source="dcr"
                        forceModal={true}
                        onClose={() => setShowCmpUi(false)}
                    />
                </Suspense>
            )}
        </div>
    );
};
