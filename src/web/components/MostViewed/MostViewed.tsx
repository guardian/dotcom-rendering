import React from 'react';
import { useApi } from '@root/src/web/components/lib/api';
import { MostViewedLayoutGrid } from './MostViewedLayoutGrid';
import { MostViewedLayoutList } from './MostViewedLayoutList';

export interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
    ageWarning: string;
    pillar: Pillar;
    image?: string;
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
    geoTargeted?: boolean;
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
    const { data, error } = useApi<any>(url);

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
