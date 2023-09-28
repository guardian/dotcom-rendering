import { css } from '@emotion/react';
import { joinUrl, Pillar } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import { isServer } from '../lib/isServer';
import type { OnwardsSource } from '../types/onwards';
import type { TagType } from '../types/tag';
import { FetchOnwardsData } from './FetchOnwardsData.importable';
import { Placeholder } from './Placeholder';
import { Section } from './Section';

type PillarForContainer =
	| 'headlines'
	| 'sport'
	| 'opinion'
	| 'culture'
	| 'lifestyle';

/**
 * This list is a direct copy from [`frontend`](https://github.com/guardian/frontend/blob/6da0b3d8bfd58e8e20f80fc738b070fb23ed154e/static/src/javascripts/projects/common/modules/onward/related.js#L27).
 * If you change this list then you should also update `frontend`.
 *
 * Order matters here (first match wins).
 */
const ALLOWED_TAGS = [
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
] as const;

/** This function looks for item in our allowlist that is present in our keywordIds */
const firstPopularTag = (keywordIds: string, isPaidContent: boolean) => {
	const tags = keywordIds.split(',');

	// For paid content we just return the first tag,
	// otherwise we find the allowlist tag that matches
	return isPaidContent
		? tags[0]
		: ALLOWED_TAGS.find((tag) => tags.includes(tag));
};

const onwardsWrapper = css`
	width: 100%;
`;

// TODO: EUR edition urls are currently pointing to INT edition
// containers, once the europe edition is live, we may want to change this
const containerUrls = {
	headlines: {
		UK: 'uk-alpha/news/regular-stories',
		US: 'c5cad9ee-584d-4e85-85cd-bf8ee481b026',
		AU: '36b9cf13-bf8b-4cf0-b882-5c5d4feac0a2',
		INT: '10f21d96-18f6-426f-821b-19df55dfb831',
		EUR: '10f21d96-18f6-426f-821b-19df55dfb831',
	},
	sport: {
		UK: '754c-8e8c-fad9-a927',
		US: 'f6dd-d7b1-0e85-4650',
		AU: 'c45d-318f-896c-3a85',
		INT: 'd1ad8ec3-5ee2-4673-94c8-cc3f8d261e52',
		EUR: 'd1ad8ec3-5ee2-4673-94c8-cc3f8d261e52',
	},
	opinion: {
		UK: '3ff78b30-52f5-4d30-ace8-c887113cbe0d',
		US: '98df412d-b0e7-4d9a-98c2-062642823e94',
		AU: 'au-alpha/contributors/feature-stories',
		INT: 'ee3386bb-9430-4a6d-8bca-b99d65790f3b',
		EUR: 'ee3386bb-9430-4a6d-8bca-b99d65790f3b',
	},
	culture: {
		UK: 'ae511a89-ef38-4ec9-aab1-3a5ebc96d118',
		US: 'fb59c1f8-72a7-41d5-8365-a4d574809bed',
		AU: '22262088-4bce-4290-9810-cb50bbead8db',
		INT: 'c7154e22-7292-4d93-a14d-22fd4b6b693d',
		EUR: 'c7154e22-7292-4d93-a14d-22fd4b6b693d',
	},
	lifestyle: {
		UK: 'uk-alpha/features/feature-stories',
		US: 'us-alpha/features/feature-stories',
		AU: '13636104-51ce-4264-bb6b-556c80227331',
		INT: '7b297ef5-a3f9-45e5-b915-b54951d7f6ec',
		EUR: '7b297ef5-a3f9-45e5-b915-b54951d7f6ec',
	},
};

const getContainer = (pillar: PillarForContainer, editionId: EditionId) => {
	return containerUrls[pillar][editionId];
};

const getContainerDataUrl = (
	pillar: ArticleTheme,
	editionId: EditionId,
	ajaxUrl: string,
) => {
	switch (pillar) {
		case Pillar.Sport:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('sport', editionId)}.json`,
			);
		case Pillar.News:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('headlines', editionId)}.json`,
			);
		case Pillar.Culture:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('culture', editionId)}.json`,
			);
		case Pillar.Lifestyle:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('lifestyle', editionId)}.json`,
			);
		case Pillar.Opinion:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('opinion', editionId)}.json`,
			);
		default:
			return joinUrl(
				ajaxUrl,
				'container/data',
				`${getContainer('headlines', editionId)}.json`,
			);
	}
};

type Props = {
	ajaxUrl: string;
	hasRelated: boolean;
	hasStoryPackage: boolean;
	isAdFreeUser: boolean;
	pageId: string;
	isPaidContent: boolean;
	showRelatedContent: boolean;
	keywordIds: string;
	contentType: string;
	tags: TagType[];
	format: ArticleFormat;
	editionId: EditionId;
	pillar: ArticleTheme;
	shortUrlId: string;
	discussionApiUrl: string;
};

/**
 * A wrapper around `Carousel` for showing related articles at the bottom
 * of an article. This contains the logic around which articles to show,
 * depending on a series of factors (story package, paid content, series tag, …)
 *
 * ## Why does this need to be an Island?
 *
 * It is a client-side only component, which cannot be rendered on the server,
 * as none of the relevant information comes from the CAPI response.
 *
 * ---
 *
 * [`Carousel` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-carousel)
 *
 */
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
	pillar,
	editionId,
	shortUrlId,
	discussionApiUrl,
}: Props) => {
	if (isServer) return <Placeholder height={600} />;

	// Related content can be a collection of articles based on
	// two things, 1: A popular tag, or 2: A generic text match
	const tagToFilterBy = firstPopularTag(keywordIds, isPaidContent);

	// In this context, Blog tags are treated the same as Series tags
	const seriesTag = tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	let url;
	let onwardsSource: OnwardsSource = 'unknown-source';

	if (!showRelatedContent) {
		// Then don't show related content
		// This is the first priority for deciding whether to include related content
	} else if (hasStoryPackage) {
		// We server render story packages so do nothing
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
		url = joinUrl(
			ajaxUrl,
			'series',
			`${seriesTag.id}.json?dcr&shortUrl=${shortUrlId}`,
		);
		onwardsSource = 'series';
	} else if (!hasRelated) {
		// There is no related content to show
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

		url = joinUrl(ajaxUrl, popularInTagUrl);
		onwardsSource = 'related-content';
	} else {
		// Default to generic related endpoint
		const relatedUrl = `/related/${pageId}.json?dcr=true`;

		url = joinUrl(ajaxUrl, relatedUrl);
		onwardsSource = 'related-stories';
	}

	const curatedDataUrl = showRelatedContent
		? getContainerDataUrl(pillar, editionId, ajaxUrl)
		: undefined;

	return (
		<div css={onwardsWrapper}>
			{!!url && (
				<Section fullWidth={true}>
					<FetchOnwardsData
						url={url}
						limit={8}
						onwardsSource={onwardsSource}
						format={format}
						discussionApiUrl={discussionApiUrl}
					/>
				</Section>
			)}
			{!!(!isPaidContent && curatedDataUrl) && (
				<Section fullWidth={true}>
					<FetchOnwardsData
						url={curatedDataUrl}
						limit={20}
						onwardsSource="curated-content"
						format={format}
						discussionApiUrl={discussionApiUrl}
					/>
				</Section>
			)}
		</div>
	);
};

export { firstPopularTag };
