import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { App as Comments } from '@guardian/discussion-rendering';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { RightColumn } from '@frontend/web/components/RightColumn';
import { StickyAd } from '@root/src/web/components/StickyAd';
import { SignedInAs } from '@frontend/web/components/SignedInAs';
import { Hide } from '@frontend/web/components/Hide';
import { Flex } from '@frontend/web/components/Flex';
import { Lazy } from '@frontend/web/components/Lazy';

type Props = {
    user?: UserProfile;
    pillar: Pillar;
    baseUrl: string;
    shortUrl: string;
    commentCount: number;
    isClosedForComments: boolean;
    enableDiscussionSwitch: boolean;
    discussionD2Uid: string;
    discussionApiClientHeader: string;
    expanded: boolean;
    commentPage?: number;
    commentPageSize?: 25 | 50 | 100;
    commentOrderBy?: 'newest' | 'oldest' | 'recommendations';
    commentToScrollTo?: number;
    onPermalinkClick: (commentId: number) => void;
};

const containerStyles = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    padding-top: ${space[3]}px;
    padding-bottom: ${space[6]}px;
    padding-right: ${space[5]}px;
`;

const bottomPadding = css`
    padding-bottom: ${space[2]}px;
`;

export const CommentsLayout = ({
    user,
    pillar,
    baseUrl,
    shortUrl,
    commentCount,
    commentPage,
    commentPageSize,
    commentOrderBy,
    expanded,
    isClosedForComments,
    enableDiscussionSwitch,
    discussionD2Uid,
    discussionApiClientHeader,
    commentToScrollTo,
    onPermalinkClick,
}: Props) => (
    <Flex direction="row">
        <LeftColumn showRightBorder={false}>
            <SignedInAs
                pillar={pillar}
                enableDiscussionSwitch={enableDiscussionSwitch}
                user={user}
                commentCount={commentCount}
                isClosedForComments={isClosedForComments}
            />
        </LeftColumn>
        <div className={containerStyles}>
            <Hide when="above" breakpoint="leftCol">
                <div className={bottomPadding}>
                    <SignedInAs
                        pillar={pillar}
                        enableDiscussionSwitch={enableDiscussionSwitch}
                        user={user}
                        commentCount={commentCount}
                    />
                </div>
            </Hide>
            {expanded ? (
                <Comments
                    user={user}
                    baseUrl={baseUrl}
                    pillar={pillar}
                    initialPage={commentPage}
                    pageSizeOverride={commentPageSize}
                    isClosedForComments={
                        isClosedForComments || !enableDiscussionSwitch
                    }
                    orderByOverride={commentOrderBy}
                    shortUrl={shortUrl}
                    additionalHeaders={{
                        'D2-X-UID': discussionD2Uid,
                        'GU-Client': discussionApiClientHeader,
                    }}
                    expanded={true}
                    commentToScrollTo={commentToScrollTo}
                    onPermalinkClick={onPermalinkClick}
                    apiKey="dotcom-rendering"
                />
            ) : (
                <Lazy margin={300}>
                    <Comments
                        user={user}
                        baseUrl={baseUrl}
                        pillar={pillar}
                        initialPage={commentPage}
                        pageSizeOverride={commentPageSize}
                        isClosedForComments={
                            isClosedForComments || !enableDiscussionSwitch
                        }
                        orderByOverride={commentOrderBy}
                        shortUrl={shortUrl}
                        additionalHeaders={{
                            'D2-X-UID': discussionD2Uid,
                            'GU-Client': discussionApiClientHeader,
                        }}
                        expanded={false}
                        commentToScrollTo={commentToScrollTo}
                        onPermalinkClick={onPermalinkClick}
                        apiKey="dotcom-rendering"
                    />
                </Lazy>
            )}
        </div>
        <RightColumn>
            <StickyAd name="comments" height={624} />
        </RightColumn>
    </Flex>
);
