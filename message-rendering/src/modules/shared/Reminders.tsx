import React from 'react';
import { css } from '@emotion/react';
import { error, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

// ---- Thank you component ---- //

interface ThankYouProps {
    reminderLabelWithPreposition: string;
}

export function ThankYou({ reminderLabelWithPreposition }: ThankYouProps): JSX.Element {
    return (
        <div>
            <header>
                <h3 css={styles.thankYouHeaderCopy}>Thank you! Your reminder is set</h3>
            </header>

            <div css={styles.thankYouBodyCopy}>
                We will be in touch to invite you to contribute. Look out for a message in your
                inbox {reminderLabelWithPreposition}. If you have any questions about contributing,
                please{' '}
                <a href="mailto:contribution.support@theguardian.com" css={styles.contactLink}>
                    contact us
                </a>
            </div>
        </div>
    );
}

// ---- Info component ---- //

interface InfoCopyProps {
    reminderLabelWithPreposition: string;
}

export function InfoCopy({ reminderLabelWithPreposition }: InfoCopyProps): JSX.Element {
    return (
        <div css={styles.infoCopy}>
            We will send you a maximum of two emails {reminderLabelWithPreposition}. To find out
            what personal data we collect and how we use it, view our{' '}
            <a
                css={styles.privacyLink}
                href="https://www.theguardian.com/help/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
            >
                Privacy policy
            </a>
        </div>
    );
}

// ---- Error component ---- //

export function ErrorCopy(): JSX.Element {
    return (
        <div css={styles.errorCopy}>
            Sorry we couldn&apos;t set a reminder for you this time. Please try again later.
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    errorCopy: css`
        ${textSans.small({ fontWeight: 'bold' })};
        color: ${error[400]};
        font-style: italic;
    `,
    infoCopy: css`
        ${textSans.small({})}
        font-size: 12px;
    `,
    privacyLink: css`
        font-weight: bold;
        color: ${neutral[0]};
    `,
    thankYouHeaderCopy: css`
        ${textSans.small({ fontWeight: 'bold' })}
        margin: 0;
    `,
    thankYouBodyCopy: css`
        ${textSans.small()}
    `,
    contactLink: css`
        color: ${neutral[0]};
    `,
};
