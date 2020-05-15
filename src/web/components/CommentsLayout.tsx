import React, { useRef, useState, RefObject, useEffect } from 'react';
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
}: Props) => {
    const [availableHeight, setAvailableHeight] = useState(624);
    const [heightChangeCount, setheightChangeCount] = useState<number>(0);
    const heightRef = useRef<HTMLDivElement>(null);

    const handleHeightChange = () => {
        setheightChangeCount(heightChangeCount + 1);
    };

    useEffect(() => {
        const checkHeight = (ref: RefObject<HTMLDivElement>) => {
            if (ref.current) {
                setAvailableHeight(ref.current.clientHeight);
            }
        };

        checkHeight(heightRef);
    }, [heightChangeCount]);

    return (
        <Flex>
            <LeftColumn showRightBorder={false}>
                <SignedInAs
                    pillar={pillar}
                    enableDiscussionSwitch={enableDiscussionSwitch}
                    user={user}
                    commentCount={commentCount}
                    isClosedForComments={isClosedForComments}
                />
            </LeftColumn>
            <div ref={heightRef} className={containerStyles}>
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
                        onHeightChange={handleHeightChange}
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
                            onHeightChange={handleHeightChange}
                        />
                    </Lazy>
                )}
            </div>
            <RightColumn>
                <StickyAd name="comments" height={availableHeight} />
            </RightColumn>
        </Flex>
    );
};
