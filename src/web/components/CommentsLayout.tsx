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
    baseUrl: string;
    shortUrl: string;
    commentCount: number;
    isClosedForComments: boolean;
    discussionD2Uid: string;
    discussionApiClientHeader: string;
};

const containerStyles = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    ${from.desktop} {
        width: 620px;
    }
`;

const bottomPadding = css`
    padding-bottom: ${space[2]}px;
`;

export const CommentsLayout = ({
    baseUrl,
    shortUrl,
    commentCount,
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
                <div className={bottomPadding}>
                    <SignedInAs commentCount={commentCount} />
                </div>
            </Hide>
            <Comments
                baseUrl={baseUrl}
                shortUrl={shortUrl}
                additionalHeaders={{
                    'D2-X-UID': discussionD2Uid,
                    'GU-Client': discussionApiClientHeader,
                }}
            />
        </div>
    </Flex>
);
