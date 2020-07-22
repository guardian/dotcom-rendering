import React, { useState, Suspense } from 'react';
import { css } from 'emotion';

import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette, opinion } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/dist/ConsentManagementPlatform';
import { OphanComponent } from '@frontend/web/browser/ophan/ophan';
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
    ${body.medium()}
    padding-top: ${space[2]}px;
    padding-bottom: ${space[6]}px;
    line-height: 135%;
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

// This css hides all the elements in the article after the #sign-in-gate
// using the General sibling combinator https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator
const hideElementsCss = `
    #sign-in-gate ~ * {
        display: none;
    }
    `;

// set the ophan component tracking vars
export const withComponentId: (id: string) => OphanComponent = (
    id: string = '',
) => ({
    componentType: 'SIGN_IN_GATE',
    id,
});

export const SignInGatePatientia = ({
    signInUrl,
    guUrl,
    dismissGate,
    abTest,
    component,
    isComment,
}: SignInGateProps) => {
    const [showCpmUi, setShowCmpUi] = useState(false);

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
                    href={signInUrl} // This needs the queryParams attached for tracking !
                    onClick={() => {
                        trackLink(component, 'register-link', abTest);
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
                        trackLink(component, 'not-now', abTest);
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
                        trackLink(component, 'sign-in-link', abTest);
                    }}
                >
                    Sign In
                </Link>
            </p>

            <div className={faq}>
                <Link
                    href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
                    onClick={() => {
                        trackLink(component, 'how-link', abTest);
                    }}
                >
                    Why register & how does it help?
                </Link>

                <Link
                    href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
                    onClick={() => {
                        trackLink(component, 'why-link', abTest);
                    }}
                >
                    How will my information & data be used?
                </Link>

                <Link
                    href={`${guUrl}/help/identity-faq`}
                    onClick={() => {
                        trackLink(component, 'help-link', abTest);
                    }}
                >
                    Get help with registering or signing in
                </Link>
            </div>
            {showCpmUi && (
                <Suspense fallback={<></>}>
                    <ConsentManagementPlatform
                        source="dcr"
                        forceModal={true}
                        onClose={() => setShowCmpUi(false)}
                    />
                </Suspense>
            )}
        </div>
    );
};
