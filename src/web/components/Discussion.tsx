import React, { useState, useEffect } from 'react';

import { CommentCount } from '@frontend/web/components/CommentCount';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';

import { Portal } from '@frontend/web/components/Portal';
import { getDiscussion } from '@root/src/web/lib/getDiscussion';
import { getCommentContext } from '@root/src/web/lib/getCommentContext';

type Props = {
    discussionApiUrl: string;
    shortUrlId: string;
    isCommentable: boolean;
    pillar: Pillar;
    discussionD2Uid: string;
    discussionApiClientHeader: string;
    enableDiscussionSwitch: boolean;
    isAdFreeUser: boolean;
    shouldHideAds: boolean;
    user?: UserProfile;
};

const commentIdFromUrl = () => {
    const { hash } = window.location;
    if (!hash) return;
    if (!hash.includes('comment')) return;
    if (!hash.split('-')[1]) return;
    return parseInt(hash.split('-')[1], 10);
};

export const Discussion = ({
    discussionApiUrl,
    shortUrlId,
    isCommentable,
    pillar,
    user,
    discussionD2Uid,
    discussionApiClientHeader,
    enableDiscussionSwitch,
    isAdFreeUser,
    shouldHideAds,
}: Props) => {
    const [commentCount, setCommentCount] = useState<number>();
    const [isClosedForComments, setIsClosedForComments] = useState<boolean>(
        true,
    );
    const [commentPage, setCommentPage] = useState<number>();
    const [commentPageSize, setCommentPageSize] = useState<25 | 50 | 100>();
    const [commentOrderBy, setCommentOrderBy] = useState<
        'newest' | 'oldest' | 'recommendations'
    >();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [hashCommentId, setHashCommentId] = useState<number | undefined>(
        commentIdFromUrl(),
    );
    const hasCommentsHash = window?.location?.hash === '#comments';

    const handlePermalink = (commentId: number) => {
        window.location.hash = `#comment-${commentId}`;
        const comment = window.document.getElementById(`comment-${commentId}`);
        if (comment) {
            // The comment was already on the page so just scroll to it.
            comment.scrollIntoView();
        }
        setHashCommentId(commentId);
        return false;
    };

    useEffect(() => {
        const callFetch = async () => {
            const response = await getDiscussion(discussionApiUrl, shortUrlId);
            setCommentCount(
                (response && response.discussion.commentCount) || 0,
            );
            setIsClosedForComments(
                response && response.discussion.isClosedForComments,
            );
        };

        if (isCommentable) {
            callFetch();
        }
    }, [discussionApiUrl, shortUrlId, isCommentable]);

    // Check the url to see if there is a comment hash, e.g. ...crisis#comment-139113120
    // If so, make a call to get the context of this comment so we know what page it is
    // on.
    useEffect(() => {
        if (hashCommentId) {
            getCommentContext(discussionApiUrl, hashCommentId).then(
                (context) => {
                    setCommentPage(context.page);
                    setCommentPageSize(context.pageSize);
                    setCommentOrderBy(context.orderBy);
                    setIsExpanded(true);
                },
            );
        }
    }, [discussionApiUrl, hashCommentId]);

    useEffect(() => {
        if (hasCommentsHash) {
            setIsExpanded(true);
        }
    }, [hasCommentsHash]);

    return (
        <>
            {(commentCount || commentCount === 0) && (
                <Portal root="comment-count-root">
                    <CommentCount
                        isCommentable={isCommentable}
                        commentCount={commentCount}
                        pillar={pillar}
                        setIsExpanded={setIsExpanded}
                    />
                </Portal>
            )}

            <CommentsLayout
                user={user}
                pillar={pillar}
                baseUrl={discussionApiUrl}
                shortUrl={shortUrlId}
                commentCount={commentCount || 0}
                commentPage={commentPage}
                commentPageSize={commentPageSize}
                commentOrderBy={commentOrderBy}
                isClosedForComments={isClosedForComments}
                discussionD2Uid={discussionD2Uid}
                discussionApiClientHeader={discussionApiClientHeader}
                enableDiscussionSwitch={enableDiscussionSwitch}
                expanded={isExpanded}
                commentToScrollTo={hashCommentId}
                onPermalinkClick={handlePermalink}
                hideAds={isAdFreeUser || shouldHideAds}
            />
        </>
    );
};
