import { css } from '@emotion/react';

import { joinUrl } from '@root/src/lib/joinUrl';
import { ElementContainer } from '@root/src/web/components/ElementContainer';

import { OnwardsData } from './OnwardsData';
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

const firstPopularTag = (
	pageTags: string | string[],
	isPaidContent: boolean,
) => {
	// This function looks for the first tag in pageTags, that also exists in our whitelist
	if (!pageTags) {
		// If there are no page tags we will never find a match so
		return false;
	}

	// The problem here is keywordIds is sometimes a string and sometimes an array of strings. Fun times.
	let tags;
	if (typeof pageTags === 'string') {
		tags = pageTags.split(',');
	} else {
		tags = pageTags;
	}

	const firstTagInWhitelist =
		tags.find((tag: string) => WHITELISTED_TAGS.includes(tag)) || false;

	// For paid content we just return the first tag, otherwise we
	// filter for the first tag in the whitelist
	return isPaidContent ? tags[0] : firstTagInWhitelist;
};

const onwardsWrapper = css`
	width: 100%;
`;

type Props = {
	ajaxUrl: string;
	hasRelated: boolean;
	hasStoryPackage: boolean;
	isAdFreeUser: boolean;
	pageId: string;
	isPaidContent: boolean;
	showRelatedContent: boolean;
	keywordIds: string | string[];
	contentType: string;
	tags: TagType[];
	format: Format;
};

export const OnwardsUpper = ({
	ajaxUrl,
	hasRelated,
	hasStoryPackage,
	isAdFreeUser,
	pageId,
	isPaidContent,
	showRelatedContent,
	keywordIds,
	contentType,
	tags,
	format,
}: Props) => {
	const dontShowRelatedContent = !showRelatedContent || !hasRelated;

	// Related content can be a collection of articles based on
	// two things, 1: A popular tag, or 2: A generic text match
	const tagToFilterBy = firstPopularTag(keywordIds, isPaidContent);

	// In this context, Blog tags are treated the same as Series tags
	const seriesTag = tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	let url;
	let ophanComponentName: OphanComponentName = 'default-onwards';

	if (hasStoryPackage) {
		// Always fetch the story package if it exists
		url = joinUrl([ajaxUrl, 'story-package', `${pageId}.json?dcr=true`]);
		ophanComponentName = 'more-on-this-story';
	} else if (isAdFreeUser && isPaidContent) {
		// Don't show any related content (other than story packages) for
		// adfree users when the content is paid for
	} else if (seriesTag) {
		// Use the series tag to get other data in the same series
		// Example: {
		//              id: "cities/series/the-illustrated-city",
		//              title: "The illustrated city",
		//              type: "Series",
		//          }
		//
		url = joinUrl([ajaxUrl, 'series', `${seriesTag.id}.json?dcr`]);
		ophanComponentName = 'series';
	} else if (dontShowRelatedContent) {
		// Then don't show related content
	} else if (tagToFilterBy) {
		// Use popular in tag endpoint
		let popularInTagUrl = `/popular-in-tag/${tagToFilterBy}.json?dcr=true`;

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
			const queryParams = tagsToExclude.map(
				(tag) => `exclude-tag=${tag}`,
			);
			popularInTagUrl += `&${queryParams.join('&')}`;
		}

		url = joinUrl([ajaxUrl, popularInTagUrl]);
		ophanComponentName = 'related-content';
	} else {
		// Default to generic related endpoint
		const relatedUrl = `/related/${pageId}.json?dcr=true`;

		url = joinUrl([ajaxUrl, relatedUrl]);
		ophanComponentName = 'related-stories';
	}

	return (
		<div css={onwardsWrapper}>
			{url && (
				<ElementContainer>
					<OnwardsData
						url={url}
						limit={8}
						ophanComponentName={ophanComponentName}
						Container={OnwardsLayout}
						format={format}
					/>
				</ElementContainer>
			)}
		</div>
	);
};
