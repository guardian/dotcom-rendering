import React from 'react';
import { hydrate } from 'react-dom';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { MostViewedRightWrapper } from '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper';
import { Counts } from '@frontend/web/components/Counts';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { CMP } from '@frontend/web/components/CMP';
import { Onwards } from '@frontend/web/components/Onwards/Onwards';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';

type IslandProps =
    | {
          pillar: Pillar;
          nav: NavType;
      }
    | {
          subnav: {
              parent?: LinkType;
              links: LinkType[];
          };
          pillar: Pillar;
          currentNavLink: string;
      }
    | {
          edition: Edition;
          dataLinkName: string;
      }
    | {
          pillar: Pillar;
      }
    | {
          pillar: Pillar;
          sectionName?: string;
          ajaxUrl: string;
      }
    | {
          limitItems?: number;
      }
    | {
          ajaxUrl: string;
          pageId: string;
          shortUrlId: string;
          pillar: Pillar;
      }
    | {
          edition: Edition;
          urls: {
              subscribe: string;
              support: string;
              contribute: string;
          };
          dataLinkNamePrefix: string;
          noResponsive: boolean;
          inHeader?: boolean;
      }
    | {
          element: RichLinkBlockElement;
          pillar: Pillar;
          ajaxEndpoint: string;
      }
    | {
          ajaxUrl: string;
          hasRelated: boolean;
          hasStoryPackage: boolean;
          isAdFreeUser: boolean;
          pageId: string;
          isPaidContent: boolean;
          showRelatedContent: boolean;
          keywordIds: string;
          contentType: string;
      }
    | {
          contentType: string;
          sectionName?: string;
          shouldHideReaderRevenue: boolean;
          isMinuteArticle: boolean;
          isPaidContent: boolean;
          tags: TagType[];
      };

type IslandType = {
    key?: number;
    component: any;
    props: IslandProps;
    root: string;
};

export const hydrateIslands = (CAPI: CAPIType, NAV: NavType) => {
    const {
        pillar,
        editionId,
        sectionName,
        pageId,
        config: { ajaxUrl, shortUrlId, isPaidContent },
    } = CAPI;

    // Define the list of islands we intend to hydrate. Each island should have a
    // corresponding root element that exists on the DOM with the id value equal to the root property
    const highPriorityIslands: IslandType[] = [
        {
            component: ReaderRevenueLinks,
            props: {
                urls: CAPI.nav.readerRevenueLinks.header,
                edition: editionId,
                dataLinkNamePrefix: 'nav2 : ',
                noResponsive: false,
                inHeader: true,
            },
            root: 'reader-revenue-links-header',
        },
        {
            component: Nav,
            props: { pillar, nav: NAV },
            root: 'nav-root',
        },
        {
            component: SubNav,
            props: {
                pillar,
                subnav: NAV.subNavSections,
                currentNavLink: NAV.currentNavLink,
            },
            root: 'sub-nav-root',
        },
    ];

    const lowPriorityIslands: IslandType[] = [
        {
            component: EditionDropdown,
            props: {
                dataLinkName: 'nav2 : topbar : edition-picker: toggle',
                edition: editionId,
            },
            root: 'edition-root',
        },
        {
            component: MostViewedRightWrapper,
            props: { pillar },
            root: 'most-viewed-right',
        },
        {
            component: Counts,
            props: {
                ajaxUrl,
                pageId,
                shortUrlId,
                pillar,
            },
            root: 'share-comment-counts',
        },
        {
            component: MostViewedFooter,
            props: {
                pillar,
                sectionName,
                ajaxUrl: CAPI.config.ajaxUrl,
            },
            root: 'most-viewed-footer',
        },
        {
            component: ReaderRevenueLinks,
            props: {
                urls: CAPI.nav.readerRevenueLinks.footer,
                edition: editionId,
                dataLinkNamePrefix: 'footer : ',
                noResponsive: true,
                inHeader: false,
            },
            root: 'reader-revenue-links-footer',
        },
        {
            component: SlotBodyEnd,
            props: {
                contentType: CAPI.contentType,
                sectionName: CAPI.sectionName,
                shouldHideReaderRevenue: CAPI.shouldHideReaderRevenue,
                isMinuteArticle: CAPI.pageType.isMinuteArticle,
                isPaidContent: CAPI.pageType.isPaidContent,
                tags: CAPI.tags,
            },
            root: 'slot-body-end',
        },
        {
            component: CMP,
            props: {},
            root: 'cmp',
        },
        {
            component: Onwards,
            props: {
                ajaxUrl: CAPI.config.ajaxUrl,
                hasRelated: CAPI.hasRelated,
                hasStoryPackage: CAPI.hasStoryPackage,
                isAdFreeUser: CAPI.isAdFreeUser,
                pageId: CAPI.pageId,
                isPaidContent: isPaidContent || false,
                showRelatedContent: CAPI.config.showRelatedContent,
                keywordIds: CAPI.config.keywordIds,
                contentType: CAPI.contentType,
            },
            root: 'onwards-content',
        },
    ];

    // Add an island for each rich link
    const richLinkIslands: IslandType[] = [];
    const elements = CAPI.blocks[0] ? CAPI.blocks[0].elements : [];
    elements.forEach((element, i) => {
        if (
            element._type ===
            'model.dotcomrendering.pageElements.RichLinkBlockElement'
        ) {
            richLinkIslands.push({
                key: i,
                component: RichLinkComponent,
                props: {
                    element,
                    pillar,
                    ajaxEndpoint: ajaxUrl,
                },
                root: `rich-link-${i}`,
            });
        }
    });

    const islands: IslandType[] = [
        ...highPriorityIslands,
        ...richLinkIslands,
        ...lowPriorityIslands,
    ];

    // Hydrate each island in the DOM
    islands.map((island: IslandType) => {
        const {
            component,
            props,
            root,
        }: {
            component: IslandType['component'];
            // props: any because TS is locking it's checks to the first type
            // in the IslandProps union, and then failing subsequent items
            // in out array of islands
            props: any;
            root: string;
        } = island;

        // Find each root on the dom for this island (rich links can have multiple) and
        // hydrate it
        document
            .querySelectorAll(`[data-island='${root}']`)
            .forEach(islandRoot => {
                hydrate(React.createElement(component, props), islandRoot);
            });
    });
};
