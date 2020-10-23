import React from 'react';
import { css } from 'emotion';

import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette, opinion } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
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
    ${headline.small()};
    padding-bottom: ${space[6]}px;

    ${from.phablet} {
        ${headline.medium()};
    }
`;

const subHeader = css`
    ${body.medium({ fontWeight: 'bold' })};
    border-top: 1px ${palette.line.primary} solid;
    border-bottom: 1px ${palette.line.primary} solid;

    padding: ${space[4]}px 0px;

    color: ${palette.text.anchorPrimary};
`;

const bodyText = css`
    ${body.medium({ lineHeight: 'regular' })}
    padding-top: ${space[2]}px;
    padding-bottom: ${space[6]}px;
`;

const signInBodyText = css`
    padding-bottom: 0;
    ${textSans.medium()}
`;

const actionButtons = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: ${space[6]}px;

    > a {
        margin-right: ${space[6]}px;
    }
`;

const registerButton = css`
    color: ${palette.text.ctaPrimary} !important;
    text-decoration: none !important;
`;

const signInLink = css`
    display: inline-block !important;
`;

const faq = css`
    padding-top: ${space[3]}px;
    padding-bottom: 18px;
    margin-top: ${space[3]}px;

    & a {
        ${textSans.medium({ fontWeight: 'bold' })}
        color: ${palette.text.primary};
        display: block;
        padding-bottom: ${space[3]}px;
    }

    & a:hover {
        color: ${palette.text.primary};
    }
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

export const SignInGatePatientia = ({
    signInUrl,
    guUrl,
    dismissGate,
    abTest,
    ophanComponentId,
    isComment,
}: SignInGateProps) => {
    return (
        <div className={signinGate} data-cy="sign-in-gate-patientia">
            <style>{hideElementsCss}</style>
            <div className={firstParagraphOverlay(!!isComment)} />
            <h1 className={headingStyles}>
                Register for free and continue reading
            </h1>
            <h2 className={subHeader}>
                The Guardian’s independent journalism is still free to read
            </h2>
            <p className={bodyText}>
                Registering lets us understand you better. This means that we
                can build better products and start to personalise the adverts
                you see so we can charge more from advertisers in the future.
            </p>
            <div className={actionButtons}>
                <LinkButton
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
                    data-cy="sign-in-gate-patientia_dismiss"
                    priority="subdued"
                    size="small"
                    onClick={() => {
                        dismissGate();
                        trackLink(ophanComponentId, 'not-now', abTest);
                    }}
                >
                    Not Now
                </LinkButton>
            </div>

            <p className={signInBodyText}>
                Already registered, contributed or subscribed?{' '}
                <Link
                    className={signInLink}
                    href={signInUrl}
                    onClick={() => {
                        trackLink(ophanComponentId, 'sign-in-link', abTest);
                    }}
                >
                    Sign In
                </Link>
            </p>

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
