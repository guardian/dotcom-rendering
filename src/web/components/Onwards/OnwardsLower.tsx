import React from 'react';

import { useApi } from '@root/src/web/lib/api';
import { joinUrl } from '@root/src/web/lib/joinUrl';

import { OnwardsLayout } from './OnwardsLayout';

type Props = {
    ajaxUrl: string;
    hasStoryPackage: boolean;
    pageId: string;
    tags: TagType[];
};

export const OnwardsLower = ({
    ajaxUrl,
    hasStoryPackage,
    pageId,
    tags,
}: Props) => {
    const onwardSections: OnwardsType[] = [];

    // In this context, Blog tags are treated the same as Series tags
    const seriesTag = tags.find(
        tag => tag.type === 'Series' || tag.type === 'Blog',
    );

    if (hasStoryPackage && seriesTag) {
        // Use the series tag to get other data in the same series
        // Example: {
        //              id: "cities/series/the-illustrated-city",
        //              title: "The illustrated city",
        //              type: "Series",
        //          }
        //
        const seriesUrl = joinUrl([
            ajaxUrl,
            'series',
            `${seriesTag.id}.json?dcr`,
        ]);
        const { data } = useApi(seriesUrl);

        if (data && data.trails) {
            onwardSections.push({
                heading: data.displayname, // This displayname property is called 'heading' elsewhere
                trails: data.trails.slice(0, 4), // Series onwards is four only
            });
        }
    }

    return <OnwardsLayout onwardSections={onwardSections} />;
};
