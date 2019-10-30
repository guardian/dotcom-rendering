import React from 'react';
import { hydrate } from 'react-dom';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/Header/EditionDropdown';
import { MostViewed } from '@frontend/web/components/MostViewed/MostViewed';
import { ShareCount } from '@frontend/web/components/ShareCount';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';

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
          config: ConfigType;
          pillar: Pillar;
          sectionName?: string;
      }
    | {
          config: ConfigType;
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
      };

type IslandType = {
    key?: number;
    component: any;
    props: IslandProps;
    root: string;
};

export const hydrateIslands = (
    CAPI: CAPIType,
    config: ConfigType,
    NAV: NavType,
) => {
    const { pillar, editionId, sectionName, pageId } = CAPI;

    // Define the list of islands we intend to hydrate. Each island should have a
    // corresponding root element that exists on the DOM with the id value equal to the root property
    const islands: IslandType[] = [
        {
            component: Nav,
            props: { pillar, nav: NAV },
            root: 'nav-root',
        },
        {
            component: EditionDropdown,
            props: {
                dataLinkName: 'nav2 : topbar : edition-picker: toggle',
                edition: editionId,
            },
            root: 'edition-root',
        },

        {
            component: MostViewed,
            props: {
                config,
                pillar,
                sectionName,
            },
            root: 'most-viewed',
        },
        {
            component: ShareCount,
            props: {
                config,
                pageId,
            },
            root: 'share-count',
        },
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
    ];

    // Add an island for each rich link
    const elements = CAPI.blocks[0] ? CAPI.blocks[0].elements : [];
    elements.forEach((element, i) => {
        if (
            element._type ===
            'model.dotcomrendering.pageElements.RichLinkBlockElement'
        ) {
            islands.push({
                key: i,
                component: RichLinkComponent,
                props: {
                    element,
                    pillar,
                    ajaxEndpoint: config.ajaxUrl,
                },
                root: `rich-link-${i}`,
            });
        }
    });

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

        const islandRoot = document.getElementById(root);
        if (islandRoot) {
            hydrate(React.createElement(component, props), islandRoot);
        }
    });
};
