import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { SignedInAs } from '@frontend/web/components/SignedInAs';
import { Hide } from '@frontend/web/components/Hide';
import { Flex } from '@frontend/web/components/Flex';

import { App as Comments } from '@guardian/discussion-rendering';

type Props = {
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
    ${from.desktop} {
        width: 620px;
    }
`;

export const CommentsLayout = ({
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
                commentCount={commentCount}
                isClosedForComments={isClosedForComments}
            />
        </LeftColumn>
        <div className={containerStyles}>
            <Hide when="above" breakpoint="leftCol">
                <SignedInAs commentCount={commentCount} />
            </Hide>
            <Comments
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
