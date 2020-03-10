import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { MostViewedRightWrapper } from '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper';
import { Counts } from '@frontend/web/components/Counts';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { CMP } from '@frontend/web/components/CMP';
import { OnwardsUpper } from '@frontend/web/components/Onwards/OnwardsUpper';
import { OnwardsLower } from '@frontend/web/components/Onwards/OnwardsLower';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { Header } from '@frontend/web/components/Header';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';

import { getCookie } from '@root/src/web/browser/cookie';

import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getDiscussion } from '@root/src/web/lib/getDiscussion';

type Props = { CAPI: CAPIType; NAV: NavType; dcr: DcrType };

type RootType =
    | 'reader-revenue-links-header'
    | 'nav-root'
    | 'sub-nav-root'
    | 'edition-root'
    | 'most-viewed-right'
    | 'share-comment-counts'
    | 'most-viewed-footer'
    | 'reader-revenue-links-footer'
    | 'slot-body-end'
    | 'cmp'
    | 'onwards-upper'
    | 'onwards-lower'
    | 'rich-link'
    | 'header-root'
    | 'comments-root';

export const hydrateApp = ({
    CAPI,
    NAV,
    dcr,
}: {
    CAPI: CAPIType;
    NAV: NavType;
    dcr: DcrType;
}) => {
    ReactDOM.render(
        <App CAPI={CAPI} NAV={NAV} dcr={dcr} />,
        document.getElementById('react-root'),
    );
};

const App = ({ CAPI, NAV, dcr }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>();
    const [countryCode, setCountryCode] = useState<string>();
    const [commentCount, setCommentCount] = useState<number>(0);
    const [isClosedForComments, setIsClosedForComments] = useState<boolean>(
        true,
    );

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    useEffect(() => {
        const callFetch = async () =>
            setCountryCode((await getCountryCode()) || '');
        callFetch();
    }, []);

    useEffect(() => {
        const callFetch = async () => {
            const response = await getDiscussion(
                dcr.config.ajaxUrl,
                dcr.config.shortUrlId,
            );
            setCommentCount(
                (response && response.discussion.commentCount) || 0,
            );
            setIsClosedForComments(
                response && response.discussion.isClosedForComments,
            );
        };
        callFetch();
    }, [dcr.config.ajaxUrl, dcr.config.shortUrlId]);

    const richLinks: {
        element: RichLinkBlockElement;
        root: RootType;
        richLinkIndex: number;
    }[] = [];
    CAPI.blocks[0].elements.map((element, i) => {
        if (
            element._type ===
            'model.dotcomrendering.pageElements.RichLinkBlockElement'
        ) {
            richLinks.push({
                element,
                root: `rich-link`,
                richLinkIndex: i,
            });
        }
    });

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
        <>
            <Hydrate root="header-root">
                <Header isSignedIn={isSignedIn} edition={CAPI.editionId} />
            </Hydrate>
            <Hydrate root="nav-root">
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Hydrate>
            <Hydrate root="sub-nav-root">
                <SubNav
                    subnav={NAV.subNavSections}
                    currentNavLink={NAV.currentNavLink}
                    pillar={CAPI.pillar}
                />
            </Hydrate>
            <Hydrate root="edition-root">
                <EditionDropdown
                    edition={CAPI.editionId}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </Hydrate>

            {richLinks &&
                richLinks.map((link, index) => (
                    <Portal
                        key={index}
                        root={link.root}
                        richLinkIndex={link.richLinkIndex}
                    >
                        <RichLinkComponent
                            element={link.element}
                            pillar={CAPI.pillar}
                            ajaxEndpoint={dcr.config.ajaxUrl}
                            richLinkIndex={link.richLinkIndex}
                        />
                    </Portal>
                ))}

            <Portal root="cmp">
                <CMP cmpUi={dcr.config.cmpUi} />
            </Portal>
            <Portal root="share-comment-counts">
                <Counts
                    ajaxUrl={dcr.config.ajaxUrl}
                    pageId={dcr.config.pageId}
                    commentCount={commentCount}
                    pillar={CAPI.pillar}
                />
            </Portal>
            <Portal root="most-viewed-right">
                <MostViewedRightWrapper pillar={CAPI.pillar} />
            </Portal>
            {/* Ensure component only renders after both variables have been assigned true or false */}
            {isSignedIn !== undefined && countryCode !== undefined && (
                <Portal root="slot-body-end">
                    <SlotBodyEnd
                        isSignedIn={isSignedIn}
                        countryCode={countryCode}
                        contentType={CAPI.contentType}
                        sectionName={CAPI.sectionName}
                        shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                        isMinuteArticle={CAPI.pageType.isMinuteArticle}
                        isPaidContent={CAPI.pageType.isPaidContent}
                        tags={CAPI.tags}
                    />
                </Portal>
            )}
            <Portal root="onwards-upper">
                <OnwardsUpper
                    ajaxUrl={dcr.config.ajaxUrl}
                    hasRelated={CAPI.hasRelated}
                    hasStoryPackage={CAPI.hasStoryPackage}
                    isAdFreeUser={CAPI.isAdFreeUser}
                    pageId={CAPI.pageId}
                    isPaidContent={dcr.config.isPaidContent || false}
                    showRelatedContent={dcr.config.showRelatedContent}
                    keywordIds={dcr.config.keywordIds}
                    contentType={CAPI.contentType}
                    tags={CAPI.tags}
                />
            </Portal>
            <Portal root="onwards-lower">
                <OnwardsLower
                    ajaxUrl={dcr.config.ajaxUrl}
                    hasStoryPackage={CAPI.hasStoryPackage}
                    tags={CAPI.tags}
                />
            </Portal>
            <Portal root="comments-root">
                <CommentsLayout
                    commentCount={commentCount}
                    isClosedForComments={isClosedForComments}
                />
            </Portal>
            <Portal root="most-viewed-footer">
                <MostViewedFooter
                    pillar={CAPI.pillar}
                    sectionName={CAPI.sectionName}
                    ajaxUrl={dcr.config.ajaxUrl}
                />
            </Portal>
            <Portal root="reader-revenue-links-header">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.footer}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="footer : "
                    noResponsive={true}
                    inHeader={false}
                />
            </Portal>
            <Portal root="reader-revenue-links-footer">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.header}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="nav2 : "
                    noResponsive={false}
                    inHeader={true}
                />
            </Portal>
        </>
    );
};

const Hydrate = ({
    root,
    children,
}: {
    root: RootType;
    children: JSX.Element;
}) => {
    const element = document.getElementById(root);
    if (!element) return null;
    window.performance.mark(`${root}-hydrate-start`);
    ReactDOM.hydrate(children, element);
    window.performance.mark(`${root}-hydrate-end`);
    window.performance.measure(
        `${root}-hydrate`,
        `${root}-hydrate-start`,
        `${root}-hydrate-end`,
    );
    return null;
};

const Portal = ({
    root,
    children,
    richLinkIndex,
}: {
    root: RootType;
    children: JSX.Element;
    richLinkIndex?: number;
}) => {
    const rootId = richLinkIndex ? `${root}-${richLinkIndex}` : root;
    const element = document.getElementById(rootId);
    if (!element) return null;
    window.performance.mark(`${rootId}-portal-start`);
    return ReactDOM.createPortal(children, element);
    window.performance.mark(`${rootId}-portal-end`);
    window.performance.measure(
        `${rootId}-portal`,
        `${rootId}-portal-start`,
        `${rootId}-portal-end`,
    );
};
