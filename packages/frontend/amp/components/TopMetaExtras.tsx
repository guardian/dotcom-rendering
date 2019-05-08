import React from 'react';
import { css, cx } from 'emotion';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import { ShareIcons } from '@frontend/amp/components/ShareIcons';
import { palette } from '@guardian/pasteup/palette';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { textSans } from '@guardian/pasteup/typography';
import TwitterIcon from '@guardian/pasteup/icons/twitter.svg';
import { composeLabsCSS } from '@root/packages/frontend/amp/lib/compose-labs-css';

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

const pillarFill = pillarMap(
    pillar =>
        css`
            fill: ${pillarPalette[pillar].main};
        `,
);

const ageWarningCss = css`
    ${textSans(1)};
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;
`;

const metaExtras = css`
    margin-bottom: 6px;
`;

const borders = css`
    border-top: 1px solid ${palette.neutral[86]};
    border-bottom: 1px solid ${palette.neutral[86]};
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 6px;
`;

// Labs paid content only
const bordersLabs = css`
    border-top: 1px solid ${palette.neutral[60]};
    border-bottom: 1px solid ${palette.neutral[60]};
`;

type SharingURLs = {
    [K in SharePlatform]?: {
        url: string;
        userMessage: string;
    }
};

const metaStyle = css`
    display: block;
    ${textSans(1)};
    color: ${palette.neutral[46]};
    padding-top: 2px;
    margin-bottom: 6px;
    text-decoration: none;
`;

const twitterIcon = css`
    fill: ${palette.neutral[46]};
    height: 12px;
    margin-bottom: -2px;
    width: 12px;
`;

const WebPublicationDate: React.FC<{
    date: string;
}> = ({ date }) => <div className={metaStyle}>{date}</div>;

const AgeWarning: React.FC<{
    warning?: string;
    pillar: Pillar;
}> = ({ warning, pillar }) => {
    if (!warning) {
        return null;
    }

    return (
        <div
            className={cx(
                ageWarningCss,
                pillarColours[pillar],
                pillarFill[pillar],
            )}
        >
            <ClockIcon /> {warning}
        </div>
    );
};

const TwitterHandle: React.FC<{
    handle?: string;
}> = ({ handle }) => {
    if (!handle) {
        return null;
    }

    return (
        <a className={metaStyle} href={`https://twitter.com/${handle}`}>
            <TwitterIcon className={twitterIcon} /> @{handle}
        </a>
    );
};

export const TopMetaExtras: React.FC<{
    sharingUrls: SharingURLs;
    pillar: Pillar;
    webPublicationDate: string;
    ageWarning?: string;
    twitterHandle?: string;
}> = ({
    sharingUrls,
    pillar,
    webPublicationDate,
    ageWarning,
    twitterHandle,
}) => (
    <div className={metaExtras}>
        <TwitterHandle handle={twitterHandle} />
        <WebPublicationDate date={webPublicationDate} />

        <div className={composeLabsCSS(pillar, borders, bordersLabs)}>
            <ShareIcons
                sharingUrls={sharingUrls}
                pillar={pillar}
                displayIcons={['facebook', 'twitter', 'email']}
            />
            <AgeWarning warning={ageWarning} pillar={pillar} />
        </div>
    </div>
);
