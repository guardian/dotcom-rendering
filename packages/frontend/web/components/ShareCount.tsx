import React from 'react';
import { css } from 'emotion';
import ShareIcon from '@frontend/static/icons/share.svg';
import {
    from,
    wide,
    leftCol,
    textSans,
    palette,
} from '@guardian/src-foundations';
import { integerCommas } from '@frontend/lib/formatters';
import { useApi } from '@frontend/web/components/lib/api';

const shareCount = css`
    ${textSans({ level: 3 })};
    font-weight: bold;
    color: ${palette.neutral[46]};

    ${leftCol} {
        border-top: 1px solid ${palette.neutral[86]};
        width: 100%;
        padding-top: 6px;
    }

    ${wide} {
        flex: 1;
        border: 0;
        padding-top: 0;
        text-align: right;
    }
`;

const shareCountContainer = css`
    ${leftCol} {
        display: inline-block;
    }
`;

const shareCountHeader = css`
    position: relative;
    height: 15px;
    margin: 0;
`;

const shareCountIcon = css`
    position: absolute;
    top: 0;
    right: 0;
    fill: ${palette.neutral[46]};
`;

const countFull = css`
    display: block;

    ${from.leftCol.until.wide} {
        display: none;
    }
`;

const countShort = css`
    display: none;

    ${from.leftCol.until.wide} {
        display: block;
    }
`;

interface Props {
    config: ConfigType;
    pageId: string;
}

interface ShareCountType {
    path: string;
    share_count: number;
    refreshStatus: boolean;
}
function buildUrl(ajaxUrl: string, pageId: string) {
    return `${ajaxUrl}/sharecount/${pageId}.json`;
}

export const ShareCount = ({ config, pageId }: Props) => {
    const url = buildUrl(config.ajaxUrl, pageId);
    const { data, error } = useApi<ShareCountType>(url);

    if (error) {
        window.guardian.modules.raven.reportError(
            error,
            {
                feature: 'share-count',
            },
            false,
        );

        return null;
    }

    if (!data || !data.share_count) {
        return null;
    }

    const displayCount = parseInt(data.share_count.toFixed(0), 10);
    const formattedDisplayCount = integerCommas(displayCount);
    const shortDisplayCount =
        displayCount > 10000
            ? `${Math.round(displayCount / 1000)}k`
            : displayCount;

    return (
        <div className={shareCount} aria-label={`${shortDisplayCount} Shares`}>
            <div className={shareCountContainer}>
                <div className={shareCountHeader}>
                    <ShareIcon className={shareCountIcon} />
                </div>
                <div
                    data-testid={'countFull'}
                    className={countFull}
                    aria-hidden="true"
                >
                    {formattedDisplayCount}
                </div>
                <div
                    data-testid={'countShort'}
                    className={countShort}
                    aria-hidden="true"
                >
                    {shortDisplayCount}
                </div>
            </div>
        </div>
    );
};
