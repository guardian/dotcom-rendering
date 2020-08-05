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
import { from } from '@guardian/src-foundations/mq';

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
    hideAds?: boolean;
};

const SPACE_TO_LEAVE_UNDERNEATH = 600;

const containerStyles = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    padding-top: ${space[3]}px;
    padding-bottom: ${space[6]}px;
    ${from.mobileLandscape} {
        padding-right: ${space[5]}px;
    }

    width: 100%;
`;

// We need to force the width of the comments to be what we expect otherwise we
// get overflow because of inner display: flex
const commentsWrapper = css`
    width: 100%;
`;

const bottomPadding = css`
    padding-bottom: ${space[2]}px;
`;

const DEFAULT_HEIGHT = 630;

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
    hideAds,
}: Props) => {
    const [heightToStick, setHeightToStick] = useState(
        hideAds ? 0 : DEFAULT_HEIGHT,
    );
    const [heightChangeCount, setheightChangeCount] = useState<number>(0);
    const heightRef = useRef<HTMLDivElement>(null);

    const handleHeightChange = () => {
        setheightChangeCount(heightChangeCount + 1);
    };

    const checkHeight = (ref: RefObject<HTMLDivElement>) => {
        if (ref.current) {
            const availableHeight = ref.current.clientHeight;
            // Don't run the sticky container all the way to the bottom
            let heightToUse = availableHeight - SPACE_TO_LEAVE_UNDERNEATH;
            // Never try to use a height less than the default size
            if (heightToUse < DEFAULT_HEIGHT) {
                heightToUse = DEFAULT_HEIGHT;
            }
            setHeightToStick(heightToUse);
        }
    };

    useEffect(() => {
        checkHeight(heightRef);
    }, [heightChangeCount]);

    useEffect(() => {
        // Whoah, why on earth are you doing this? Are you mad?
        // Yup, this is a hackity, hack, hack. It's bad because we have no way to be sure that the dom
        // has finished rendering so maybe the check will fail (return the wrong height), and it's also
        // bad because we could be running the check too late (delaying the dom update). So why?
        // Because we are already working on a better way to render this ad slot so we're happy
        // to leave this code sitting here for now as a workaround
        // TODO: **** Remove this ****
        if (expanded) {
            let intervalCount = 0;
            const checkHeightInterval = setInterval(() => {
                intervalCount += 1;
                checkHeight(heightRef);
                if (intervalCount === 8) {
                    clearInterval(checkHeightInterval);
                }
            }, 500);
        }
    }, [expanded]);

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
                    <div className={commentsWrapper}>
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
                    </div>
                ) : (
                    <Lazy margin={300}>
                        <div className={commentsWrapper}>
                            <Comments
                                user={user}
                                baseUrl={baseUrl}
                                pillar={pillar}
                                initialPage={commentPage}
                                pageSizeOverride={commentPageSize}
                                isClosedForComments={
                                    isClosedForComments ||
                                    !enableDiscussionSwitch
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
                        </div>
                    </Lazy>
                )}
            </div>
            <RightColumn>
                <StickyAd name="comments" height={heightToStick} />
            </RightColumn>
        </Flex>
    );
};
