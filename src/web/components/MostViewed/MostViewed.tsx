import React from 'react';
// import { css, cx } from 'emotion';
// import { palette } from '@guardian/src-foundations';
// import { headline } from '@guardian/src-foundations/typography';
// import { from, between, Breakpoint } from '@guardian/src-foundations/mq';
// import { namedAdSlotParameters } from '@root/src/model/advertisement';
// import { AdSlot, labelStyles } from '@root/src/web/components/AdSlot';
import { useApi } from '@root/src/web/components/lib/api';

// import { MostViewedGrid } from './MostViewedGrid';
import { MostViewedLayoutGrid } from './MostViewedLayoutGrid';
import { MostViewedLayoutList } from './MostViewedLayoutList';
// import e from 'express';

export interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
    ageWarning: string;
    pillar: Pillar;
    image?: string;
    byline?: string;
    showByline: boolean;
}

export interface TabType {
    heading: string;
    trails: TrailType[];
}

interface Props {
    layout?: string;
    sectionName?: string;
    config: ConfigType;
    pillar: Pillar;
    geoTargeted: boolean;
}

function buildSectionUrl(sectionName?: string, geoTargeted?: boolean) {
    let endpoint: string;
    if (geoTargeted) {
        endpoint = '/most-read-geo.json';
    } else {
        const sectionsWithoutPopular = ['info', 'global'];
        const hasSection =
            sectionName && !sectionsWithoutPopular.includes(sectionName);
        endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;
    }

    return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
}

export const MostViewed = ({
    config,
    sectionName,
    pillar,
    layout,
    geoTargeted,
}: Props) => {
    const url = buildSectionUrl(sectionName, geoTargeted);
    const { data, error } = useApi<TabType[]>(url);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'most-viewed');
        return null;
    }

    if (data) {
        if (layout === 'grid') {
            return (
                <MostViewedLayoutGrid
                    data={data}
                    config={config}
                    sectionName={sectionName}
                    pillar={pillar}
                />
            );
        }

        return (
            <MostViewedLayoutList
                data={data}
                config={config}
                sectionName={sectionName}
                pillar={pillar}
            />
        );
    }

    return null;
};
