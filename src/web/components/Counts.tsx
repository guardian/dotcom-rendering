import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

import { ShareCount } from '@frontend/web/components/ShareCount';
import { CommentCount } from '@frontend/web/components/CommentCount';
import { useApi } from '@root/src/web/lib/api';
import { formatCount } from '@root/src/web/lib/formatCount';
import { joinUrl } from '@root/src/web/lib/joinUrl';

type Props = {
    ajaxUrl: string;
    pageId: string;
    pillar: Pillar;
    commentCount?: number;
    setIsExpanded: Function;
};

type ShareCountType = {
    path: string;
    share_count: number;
    refreshStatus: boolean;
};

const containerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const NumbersBorder = () => (
    <div
        data-testid="numbers-border"
        className={css`
            height: 40px;
            margin-left: 4px;
            margin-right: 4px;
            border-left: 1px solid ${border.secondary};
        `}
    />
);

export const Counts = ({
    ajaxUrl,
    pageId,
    commentCount,
    pillar,
    setIsExpanded,
}: Props) => {
    const shareUrl = joinUrl([ajaxUrl, 'sharecount', `${pageId}.json`]);
    const { data: shareData, error: shareError } = useApi<ShareCountType>(
        shareUrl,
    );

    if (shareError) {
        window.guardian.modules.sentry.reportError(
            shareError,
            'share-comment-counts',
        );
    }

    const shareCount = shareData && shareData.share_count;
    const hasShareData: boolean =
        !shareError && (!!shareCount || shareCount === 0);
    const shareCountGtZero: boolean = !!shareCount && shareCount > 0;
    const hasCommentData = commentCount || commentCount === 0;

    if (!hasShareData && !hasCommentData) {
        return null;
    }

    const { short: shareShort, long: shareLong } = formatCount(
        (shareData && shareData.share_count) || 0,
    );

    const { short: commentShort, long: commentLong } = formatCount(
        commentCount || 0,
    );

    return (
        <div className={containerStyles}>
            {hasShareData && shareCountGtZero && (
                <ShareCount short={shareShort} long={shareLong} />
            )}
            {hasShareData && shareCountGtZero && hasCommentData && (
                <NumbersBorder />
            )}
            {hasCommentData && (
                <CommentCount
                    short={commentShort}
                    long={commentLong}
                    pillar={pillar}
                    setIsExpanded={setIsExpanded}
                />
            )}
        </div>
    );
};
