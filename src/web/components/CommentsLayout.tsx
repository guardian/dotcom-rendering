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
    commentPage?: number;
    commentPageSize?: number;
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
    // commentPage,
    // commentPageSize,
    isClosedForComments,
    discussionD2Uid,
    discussionApiClientHeader,
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
                // TODO: Enable this when https://github.com/guardian/discussion-rendering/pull/113 is deployed and a new version published
                // initialPage={commentPage}
                // TODO: Enable this when https://github.com/guardian/discussion-rendering/pull/115 is deployed and a new version published
                // pageSizeOverride={commentPageSize}
                shortUrl={shortUrl}
                additionalHeaders={{
                    'D2-X-UID': discussionD2Uid,
                    'GU-Client': discussionApiClientHeader,
                }}
            />
        </div>
    </Flex>
);
