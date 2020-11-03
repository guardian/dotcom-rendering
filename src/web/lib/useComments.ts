import { useState, useEffect } from 'react';
import { useApi } from '@root/src/web/lib/api';

type CommentType = {
    id: string;
    count: number;
};

type CommentsType = {
    counts: CommentType[];
};

const findComments = (counts: CommentType[], shortUrl?: string): number => {
    if (!shortUrl) return 0;
    const match = counts.find(
        (count) => count.id === shortUrl.split('theguardian.com')[1],
    );
    return match ? match.count : 0;
};

const updateTrailsWithCounts = (trails: TrailType[], counts: CommentType[]) => {
    return trails.map((trail) => {
        const { shortUrl } = trail;
        const countOfComments = findComments(counts, shortUrl);
        return {
            ...trail,
            // Only set the comment count on a card if some comments were made
            // (otherwise we'd fill the page with distracting zero comment icons)
            commentCount: countOfComments > 0 ? countOfComments : undefined,
        };
    });
};

const withComments = (
    onwardSections: OnwardsType[],
    counts: CommentType[],
): OnwardsType[] => {
    if (counts.length === 0) return onwardSections;
    return onwardSections.map((section) => {
        return {
            description: section.description,
            heading: section.heading,
            url: section.url,
            trails: updateTrailsWithCounts(section.trails, counts),
            ophanComponentName: section.ophanComponentName,
        };
    });
};

const buildUrl = (sections: OnwardsType[]) => {
    const shortUrls: string[] = [];
    sections.forEach((section) => {
        section.trails.forEach((trail) => {
            if (trail.shortUrl) shortUrls.push(trail.shortUrl);
        });
    });

    // Expected input: ["https://theguardian.com/p/cngmz", ..., "https://theguardian.com/p/cngtm"]
    const shortUrlIds = shortUrls
        .map((url) => url.split('theguardian.com')[1])
        .join(',');
    // Expected output: /p/3pm9v,/p/4k83z,/p/6bnba,/p/8zv38,/p/b6xa7,/p/b7cp9,/p/by5xp

    return `https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=${shortUrlIds}`;
};

export function useComments<T>(onwardsSections: OnwardsType[]) {
    // useComments takes the onwards response and makes a batch call to the
    // discussion api (useApi) to get comment counts for all articles referenced in
    // the trails. It then uses the response from that call to create a copy of the
    // onwards data that has the commentCount property filled in
    const [counts, setCounts] = useState<CommentType[]>([]);

    const url = buildUrl(onwardsSections);
    const { data } = useApi<CommentsType>(url);

    useEffect(() => {
        setCounts((data && data.counts) || []);
    }, [data]);

    const sectionsWithComments = withComments(onwardsSections, counts);

    return sectionsWithComments;
}
