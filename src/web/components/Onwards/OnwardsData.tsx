import React from 'react';

import { useApi } from '@root/src/web/lib/api';

import { OnwardsLayout } from './OnwardsLayout';

type Props = {
    url: string;
    limit: number; // Limit the number of items shown (the api often returns more)
    ophanComponentName: OphanComponentName;
};

type OnwardsResponse = {
    trails: [];
    heading: string;
    displayname: string;
};

export const OnwardsData = ({ url, limit, ophanComponentName }: Props) => {
    const { data } = useApi<OnwardsResponse>(url);
    const onwardSections: OnwardsType[] = [];
    if (data && data.trails) {
        onwardSections.push({
            heading: data.heading || data.displayname, // Sometimes the api returns heading as 'displayName'
            trails: limit ? data.trails.slice(0, limit) : data.trails,
            ophanComponentName,
        });
    }

    return <OnwardsLayout onwardSections={onwardSections} />;
};
