import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { SignedInAs } from '@frontend/web/components/SignedInAs';
import { Hide } from '@frontend/web/components/Hide';
import { Flex } from '@frontend/web/components/Flex';

import { App as Comments } from '@guardian/discussion-rendering';

type Props = {
    user?: UserProfile;
    baseUrl: string;
    shortUrl: string;
    commentCount: number;
    isClosedForComments: boolean;
    discussionD2Uid: string;
    discussionApiClientHeader: string;
    expanded: boolean;
    commentPage?: number;
    commentPageSize?: 20 | 25 | 50 | 100;
    commentOrderBy?: 'newest' | 'oldest' | 'mostrecommended';
    commentToScrollTo?: number;
};

const containerStyles = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    ${from.desktop} {
        width: 620px;
    }

    padding-top: ${space[3]}px;
    padding-bottom: ${space[6]}px;
`;

const bottomPadding = css`
    padding-bottom: ${space[2]}px;
`;

export const CommentsLayout = ({
    user,
    baseUrl,
    shortUrl,
    commentCount,
    commentPage,
    commentPageSize,
    commentOrderBy,
    expanded,
    isClosedForComments,
    discussionD2Uid,
    discussionApiClientHeader,
    commentToScrollTo,
}: Props) => (
    <Flex direction="row">
        <LeftColumn showRightBorder={false}>
            <SignedInAs
                user={user}
                commentCount={commentCount}
                isClosedForComments={isClosedForComments}
            />
        </LeftColumn>
        <div className={containerStyles}>
            <Hide when="above" breakpoint="leftCol">
                <div className={bottomPadding}>
                    <SignedInAs user={user} commentCount={commentCount} />
                </div>
            </Hide>
            <Comments
                user={user}
                baseUrl={baseUrl}
                initialPage={commentPage}
                pageSizeOverride={commentPageSize}
                orderByOverride={commentOrderBy}
                shortUrl={shortUrl}
                additionalHeaders={{
                    'D2-X-UID': discussionD2Uid,
                    'GU-Client': discussionApiClientHeader,
                }}
                expanded={expanded}
                commentToScrollTo={commentToScrollTo}
            />
        </div>
    </Flex>
);
