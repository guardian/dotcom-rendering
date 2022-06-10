import { css } from '@emotion/react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../sdcShared/lib';
import { Stage, Tracking } from '../../sdcShared/types';
import React, { RefObject } from 'react';

const styles = {
    iframeContainer: css`
        border: none;
        width: 100%;
    `,
};

interface ContributionsEpicCheckoutProps {
    iframeRef: RefObject<HTMLIFrameElement>;
    iframeHeight: number;
    tracking: Tracking;
    onReminderClicked: () => void;
    numArticles?: number;
    countryCode?: string;
    reminderCta?: string;
    stage: Stage;
}

export function ContributionsEpicCheckout({
    iframeRef,
    iframeHeight,
    tracking,
    numArticles,
    countryCode,
    reminderCta,
    stage,
}: ContributionsEpicCheckoutProps): JSX.Element {
    const iframeUrl = getIframeUrl(tracking, stage, numArticles, countryCode, reminderCta);

    return (
        <div>
            <iframe
                ref={iframeRef}
                src={iframeUrl}
                css={styles.iframeContainer}
                style={{ height: iframeHeight }}
                allow="payment *"
                scrolling="no"
            />
        </div>
    );
}

// ---- Helpers ---- //

function getIframeUrl(
    tracking: Tracking,
    stage: Stage,
    numArticles?: number,
    countryCode?: string,
    reminderCta?: string,
) {
    return addRegionIdAndTrackingParamsToSupportUrl(
        addReminderCtaToUrl(getBaseUrl(stage), reminderCta),
        tracking,
        numArticles,
        countryCode,
    );
}

function addReminderCtaToUrl(urlString: string, reminderCta?: string) {
    if (!reminderCta) {
        return urlString;
    }

    const url = new URL(urlString);
    url.searchParams.append('reminderCta', reminderCta);

    return url.toString();
}

function getBaseUrl(stage: Stage): string {
    if (stage === 'PROD') {
        return 'https://support.theguardian.com/contribute-in-epic';
    } else if (stage === 'CODE') {
        return 'https://support.code.dev-theguardian.com/contribute-in-epic';
    }
    return 'https://support.thegulocal.com/contribute-in-epic';
}
