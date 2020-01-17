import React from 'react';
import { hydrate } from 'react-dom';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { MostViewedRightWrapper } from '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper';
import { ShareCount } from '@frontend/web/components/ShareCount';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
import { Onwards } from '@frontend/web/components/Onwards/Onwards';

type IslandProps =
    | {
          pillar: Pillar;
          nav: NavType;
      }
    | {
          edition: Edition;
          dataLinkName: string;
      }
    | {
          pillar: Pillar;
          sectionName?: string;
      }
    | {
          limitItems?: number;
      }
    | {
          ajaxUrl: string;
          pageId: string;
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
          keywordIds: string[];
          contentType: string;
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
        config: { ajaxUrl },
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
            component: ShareCount,
            props: {
                ajaxUrl,
                pageId,
            },
            root: 'share-count',
        },
        {
            component: MostViewedFooter,
            props: {
                pillar,
                sectionName,
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
            component: CookieBanner,
            props: {},
            root: 'cookie-banner',
        },
        {
            component: Onwards,
            props: {
                ajaxUrl: CAPI.config.ajaxUrl,
                hasRelated: CAPI.hasRelated,
                hasStoryPackage: CAPI.hasStoryPackage,
                isAdFreeUser: CAPI.isAdFreeUser,
                pageId: CAPI.pageId,
                isPaidContent: CAPI.config.isPaidContent,
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
