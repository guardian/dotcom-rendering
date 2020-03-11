import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { SignedInAs } from '@frontend/web/components/SignedInAs';
import { Hide } from '@frontend/web/components/Hide';
import { Flex } from '@frontend/web/components/Flex';

import { App as Comments } from 'discussion-rendering';

type Props = {
    shortUrl: string;
    commentCount: number;
    isClosedForComments: boolean;
};

const containerStyles = css`
    display: flex;
    flex-grow: 1;
    ${from.desktop} {
        width: 620px;
    }
`;

export const CommentsLayout = ({
    shortUrl,
    commentCount,
    isClosedForComments,
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
            <Comments shortUrl={shortUrl} />
        </div>
    </Flex>
);
