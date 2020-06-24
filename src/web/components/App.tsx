import React, { useState, useEffect, Suspense } from 'react';

import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { Counts } from '@frontend/web/components/Counts';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { Links } from '@frontend/web/components/Links';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { GetMatchNav } from '@frontend/web/components/GetMatchNav';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';
import { StickyBottomBanner } from '@root/src/web/components/StickyBottomBanner/StickyBottomBanner';
import { incrementWeeklyArticleCount } from '@guardian/automat-client';

import { Portal } from '@frontend/web/components/Portal';
import { Hydrate } from '@frontend/web/components/Hydrate';
import { Lazy } from '@frontend/web/components/Lazy';
import { Placeholder } from '@root/src/web/components/Placeholder';

import { initPerf } from '@root/src/web/browser/initPerf';
import { getCookie } from '@root/src/web/browser/cookie';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getDiscussion } from '@root/src/web/lib/getDiscussion';
import { getUser } from '@root/src/web/lib/getUser';
import { getCommentContext } from '@root/src/web/lib/getCommentContext';
import { FocusStyleManager } from '@guardian/src-foundations/utils';
import {incrementAlreadyVisited} from "@root/src/web/lib/alreadyVisited";

// *******************************
// ****** Dynamic imports ********
// *******************************
const MostViewedRightWrapper = React.lazy(() => {
    const { start, end } = initPerf('MostViewedRightWrapper');
    start();
    return import(
        /* webpackChunkName: "MostViewedRightWrapper" */ '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper'
    ).then(module => {
        end();
        return { default: module.MostViewedRightWrapper };
    });
});
const OnwardsUpper = React.lazy(() => {
    const { start, end } = initPerf('OnwardsUpper');
    start();
    return import(
        /* webpackChunkName: "OnwardsUpper" */ '@frontend/web/components/Onwards/OnwardsUpper'
    ).then(module => {
        end();
        return { default: module.OnwardsUpper };
    });
});
const OnwardsLower = React.lazy(() => {
    const { start, end } = initPerf('OnwardsLower');
    start();
    return import(
        /* webpackChunkName: "OnwardsLower" */ '@frontend/web/components/Onwards/OnwardsLower'
    ).then(module => {
        end();
        return { default: module.OnwardsLower };
    });
});
const GetMatchStats = React.lazy(() => {
    const { start, end } = initPerf('GetMatchStats');
    start();
    return import(
        /* webpackChunkName: "GetMatchStats" */ '@frontend/web/components/GetMatchStats'
    ).then(module => {
        end();
        return { default: module.GetMatchStats };
    });
});

type Props = { CAPI: CAPIBrowserType; NAV: NavType };

const commentIdFromUrl = () => {
    const { hash } = window.location;
    if (!hash) return;
    if (!hash.includes('comment')) return;
    if (!hash.split('-')[1]) return;
    return parseInt(hash.split('-')[1], 10);
};

const hasCommentsHashInUrl = () => {
    const { hash } = window.location;
    return hash && hash === '#comments';
};

const decidePillar = (CAPI: CAPIBrowserType): Pillar => {
    // We override the pillar to be opinion on Comment news pieces
    if (CAPI.designType === 'Comment' && CAPI.pillar === 'news')
        return 'opinion';
    return CAPI.pillar;
};

export const App = ({ CAPI, NAV }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>();
    const [user, setUser] = useState<UserProfile>();
    const [countryCode, setCountryCode] = useState<string>();
    const [commentCount, setCommentCount] = useState<number>(0);
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

    const hasCommentsHash = hasCommentsHashInUrl();

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    useEffect(() => {
        const callGetUser = async () => {
            setUser(await getUser(CAPI.config.discussionApiUrl));
        };

        if (isSignedIn) {
            callGetUser();
        }
    }, [isSignedIn, CAPI.config.discussionApiUrl]);

    useEffect(() => {
        const callFetch = async () =>
            setCountryCode((await getCountryCode()) || '');
        callFetch();
    }, []);

    useEffect(() => {
        const callFetch = async () => {
            const response = await getDiscussion(
                CAPI.config.discussionApiUrl,
                CAPI.config.shortUrlId,
            );
            setCommentCount(
                (response && response.discussion.commentCount) || 0,
            );
            setIsClosedForComments(
                response && response.discussion.isClosedForComments,
            );
        };

        if (CAPI.isCommentable) {
            callFetch();
        }
    }, [
        CAPI.config.discussionApiUrl,
        CAPI.config.shortUrlId,
        CAPI.isCommentable,
    ]);

    useEffect(() => {
        incrementAlreadyVisited();
    }, []);

    // Log an article view using the Slot Machine client lib
    // This function must be called once per article serving.
    // We should monitor this function call to ensure it only happens within an
    // article pages when other pages are supported by DCR.
    useEffect(() => {
        incrementWeeklyArticleCount();
    }, []);

    // Check the url to see if there is a comment hash, e.g. ...crisis#comment-139113120
    // If so, make a call to get the context of this comment so we know what page it is
    // on.
    useEffect(() => {
        if (hashCommentId) {
            getCommentContext(CAPI.config.discussionApiUrl, hashCommentId).then(
                context => {
                    setCommentPage(context.page);
                    setCommentPageSize(context.pageSize);
                    setCommentOrderBy(context.orderBy);
                    setIsExpanded(true);
                },
            );
        }
    }, [CAPI.config.discussionApiUrl, hashCommentId]);

    useEffect(() => {
        if (hasCommentsHash) {
            setIsExpanded(true);
        }
    }, [hasCommentsHash]);

    // Ensure the focus state of any buttons/inputs in any of the Source
    // components are only applied when navigating via keyboard.
    // READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
    useEffect(() => {
        FocusStyleManager.onlyShowFocusOnTabs();
    }, []);

    const pillar = decidePillar(CAPI);

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

    return (
        // Do you need to Hydrate or do you want a Portal?
        //
        // Hydrate: If your component is server rendered and you're hydrating it with
        // more data or making it interactive on the client and you do not need to access
        // global application state.
        //
        // Portal: If your component is not server rendered but a pure client-side component
        // and/or you want to access global application state, you want to use a Portal.
        //
        // Note: Both require a 'root' element that needs to be server rendered.
        <React.StrictMode>
            <Portal root="reader-revenue-links-header">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.header}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="nav2 : "
                    inHeader={true}
                />
            </Portal>
            <Hydrate root="links-root">
                <Links userId={user ? user.userId : undefined} />
            </Hydrate>
            <Hydrate root="edition-root">
                <EditionDropdown
                    edition={CAPI.editionId}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </Hydrate>
            {NAV.subNavSections && (
                <Hydrate root="sub-nav-root">
                    <>
                        <SubNav
                            subNavSections={NAV.subNavSections}
                            currentNavLink={NAV.currentNavLink}
                            pillar={pillar}
                        />
                    </>
                </Hydrate>
            )}
            {CAPI.matchUrl && (
                <Portal root="match-nav">
                    <GetMatchNav matchUrl={CAPI.matchUrl} />
                </Portal>
            )}
            {CAPI.richLinks.map((link, index) => (
                <Portal
                    key={index}
                    root="rich-link"
                    richLinkIndex={link.richLinkIndex}
                >
                    <RichLinkComponent
                        element={link}
                        pillar={pillar}
                        ajaxEndpoint={CAPI.config.ajaxUrl}
                        richLinkIndex={index}
                    />
                </Portal>
            ))}
            <Portal root="share-comment-counts">
                {CAPI.isCommentable ? (
                    <Counts
                        ajaxUrl={CAPI.config.ajaxUrl}
                        pageId={CAPI.config.pageId}
                        commentCount={commentCount}
                        pillar={pillar}
                        setIsExpanded={setIsExpanded}
                    />
                ) : (
                    <Counts
                        ajaxUrl={CAPI.config.ajaxUrl}
                        pageId={CAPI.config.pageId}
                        pillar={pillar}
                        setIsExpanded={setIsExpanded}
                    />
                )}
            </Portal>
            <Portal root="most-viewed-right">
                <Lazy margin={100}>
                    <Suspense fallback={<></>}>
                        <MostViewedRightWrapper pillar={pillar} />
                    </Suspense>
                </Lazy>
            </Portal>
            {CAPI.matchUrl && (
                <Portal root="match-stats">
                    <Lazy margin={300}>
                        <Suspense fallback={<Placeholder height={800} />}>
                            <GetMatchStats matchUrl={CAPI.matchUrl} />
                        </Suspense>
                    </Lazy>
                </Portal>
            )}
            <Portal root="slot-body-end">
                <SlotBodyEnd
                    isSignedIn={isSignedIn}
                    countryCode={countryCode}
                    contentType={CAPI.contentType}
                    sectionName={CAPI.sectionName}
                    shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                    isMinuteArticle={CAPI.pageType.isMinuteArticle}
                    isPaidContent={CAPI.pageType.isPaidContent}
                    isSensitive={CAPI.config.isSensitive}
                    tags={CAPI.tags}
                    contributionsServiceUrl={CAPI.contributionsServiceUrl}
                />
            </Portal>
            <Portal
                root={
                    isSignedIn
                        ? 'onwards-upper-whensignedin'
                        : 'onwards-upper-whensignedout'
                }
            >
                <Lazy margin={300}>
                    <Suspense fallback={<></>}>
                        <OnwardsUpper
                            ajaxUrl={CAPI.config.ajaxUrl}
                            hasRelated={CAPI.hasRelated}
                            hasStoryPackage={CAPI.hasStoryPackage}
                            isAdFreeUser={CAPI.isAdFreeUser}
                            pageId={CAPI.pageId}
                            isPaidContent={CAPI.config.isPaidContent || false}
                            showRelatedContent={CAPI.config.showRelatedContent}
                            keywordIds={CAPI.config.keywordIds}
                            contentType={CAPI.contentType}
                            tags={CAPI.tags}
                        />
                    </Suspense>
                </Lazy>
            </Portal>
            <Portal
                root={
                    isSignedIn
                        ? 'onwards-lower-whensignedin'
                        : 'onwards-lower-whensignedout'
                }
            >
                <Lazy margin={300}>
                    <Suspense fallback={<></>}>
                        <OnwardsLower
                            ajaxUrl={CAPI.config.ajaxUrl}
                            hasStoryPackage={CAPI.hasStoryPackage}
                            tags={CAPI.tags}
                        />
                    </Suspense>
                </Lazy>
            </Portal>

            {/* Don't lazy render comments if we have a comment id in the url or the comments hash. In
                these cases we will be scrolling to comments and want them loaded */}
            <Hydrate root="comments">
                <CommentsLayout
                    user={user}
                    pillar={pillar}
                    baseUrl={CAPI.config.discussionApiUrl}
                    shortUrl={CAPI.config.shortUrlId}
                    commentCount={commentCount}
                    commentPage={commentPage}
                    commentPageSize={commentPageSize}
                    commentOrderBy={commentOrderBy}
                    isClosedForComments={isClosedForComments}
                    discussionD2Uid={CAPI.config.discussionD2Uid}
                    discussionApiClientHeader={
                        CAPI.config.discussionApiClientHeader
                    }
                    enableDiscussionSwitch={CAPI.config.enableDiscussionSwitch}
                    expanded={isExpanded}
                    commentToScrollTo={hashCommentId}
                    onPermalinkClick={handlePermalink}
                    hideAds={CAPI.isAdFreeUser || CAPI.shouldHideAds}
                />
            </Hydrate>
            <Portal root="most-viewed-footer">
                <MostViewedFooter
                    pillar={pillar}
                    sectionName={CAPI.sectionName}
                    ajaxUrl={CAPI.config.ajaxUrl}
                />
            </Portal>
            <Portal root="reader-revenue-links-footer">
                <Lazy margin={300}>
                    <ReaderRevenueLinks
                        urls={CAPI.nav.readerRevenueLinks.footer}
                        edition={CAPI.editionId}
                        dataLinkNamePrefix="footer : "
                        inHeader={false}
                    />
                </Lazy>
            </Portal>
            <Portal root="bottom-banner">
                <StickyBottomBanner
                    isSignedIn={isSignedIn}
                    countryCode={countryCode}
                    CAPI={CAPI}
                />
            </Portal>
        </React.StrictMode>
    );
};
