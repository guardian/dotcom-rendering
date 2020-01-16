import React from 'react';

import { useApi } from '@frontend/web/components/lib/api';

import { OnwardsLayout } from './OnwardsLayout';

// This list is a direct copy from https://github.com/guardian/frontend/blob/6da0b3d8bfd58e8e20f80fc738b070fb23ed154e/static/src/javascripts/projects/common/modules/onward/related.js#L27
// If you change this list then you should also update ^
// order matters here (first match wins)
export const WHITELISTED_TAGS = [
    // sport tags
    'sport/cricket',
    'sport/rugby-union',
    'sport/rugbyleague',
    'sport/formulaone',
    'sport/tennis',
    'sport/cycling',
    'sport/motorsports',
    'sport/golf',
    'sport/horse-racing',
    'sport/boxing',
    'sport/us-sport',
    'sport/australia-sport',

    // football tags
    'football/championsleague',
    'football/premierleague',
    'football/championship',
    'football/europeanfootball',
    'football/world-cup-2014',

    // football team tags
    'football/manchester-united',
    'football/chelsea',
    'football/arsenal',
    'football/manchestercity',
    'football/tottenham-hotspur',
    'football/liverpool',
];

const joinUrl = (parts: string[]) => {
    // Remove any leading or trailing slashes from all parts and then join cleanly on
    // a single slash - prevents malformed urls
    const trimmed = parts
        .map(part => {
            // Trim left
            if (part.substr(0, 1) === '/') return part.slice(1);
            return part;
        })
        .map(part => {
            // Trim right
            if (part.substr(part.length - 1, 1) === '/')
                return part.slice(0, -1);
            return part;
        });

    return trimmed.join('/');
};

const firstPopularTag = (pageTags: string[], isPaidContent: boolean) => {
    // This function looks for the first tag in pageTags, that also exists in our whitelist
    if (!pageTags) {
        // If there are no page tags we will never find a match so
        return false;
    }

    const isInWhitelist = (tag: string) => WHITELISTED_TAGS.includes(tag);

    // For paid content we just return the first tag, otherwise we
    // filter for the first tag in the whitelist
    return isPaidContent ? pageTags[0] : pageTags.find(isInWhitelist);
};

type Props = {
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

export const Onwards = ({
    ajaxUrl,
    hasRelated,
    hasStoryPackage,
    isAdFreeUser,
    pageId,
    isPaidContent,
    showRelatedContent,
    keywordIds,
    contentType,
}: Props) => {
    const onwardSections: OnwardsType[] = [];

    if (hasStoryPackage) {
        // Always fetch the story package if it exists
        const { data } = useApi(
            joinUrl([ajaxUrl, 'story-package', `${pageId}.json?dcr=true`]),
        );

        const storyPackage = data;

        if (data && data.trails && data.trails.length > 7) {
            onwardSections.push({
                heading: storyPackage.heading,
                trails: storyPackage.trails,
                layout: 'fourAndFour',
            });
        }
    } else if (isAdFreeUser && isPaidContent) {
        // Don't show any related content (other than story packages) for
        // adfree users when the content is paid for
    } else if (showRelatedContent && hasRelated) {
        // Related content can be a collection of articles based on
        // two things, 1: A popular tag, or 2: A generic text match
        const popularTag = firstPopularTag(keywordIds, isPaidContent);

        let relatedUrl;
        if (popularTag) {
            // Use popular in tag endpoint
            relatedUrl = `/popular-in-tag/${popularTag}.json`;
        } else {
            // Default to generic related endpoint
            relatedUrl = `/related/${pageId}.json`;
        }
        relatedUrl += '?dcr=true';

        // --- Tag excludes --- //
        const tagsToExclude = [];
        // Exclude ad features from non-ad feature content
        if (!isPaidContent) {
            tagsToExclude.push('tone/advertisement-features');
        }
        // We don't want to show professional network content on videos or interactives
        if (
            contentType.toLowerCase() === 'video' ||
            contentType.toLowerCase() === 'interactive'
        ) {
            tagsToExclude.push('guardian-professional/guardian-professional');
        }

        // Add any exclude tags to the url
        if (tagsToExclude.length > 0) {
            const queryParams = tagsToExclude.map(tag => `exclude-tag=${tag}`);
            relatedUrl += `&${queryParams.join('&')}`;
        }

        const { data } = useApi(joinUrl([ajaxUrl, relatedUrl]));

        const relatedContent = data;

        if (data && data.trails && data.trails.length > 7) {
            onwardSections.push({
                heading: relatedContent.heading,
                trails: relatedContent.trails,
                layout: 'fourAndFour',
            });
        }
    }

    if (!onwardSections || onwardSections.length === 0) {
        return null;
    }

    return <OnwardsLayout onwardSections={onwardSections} />;
};
