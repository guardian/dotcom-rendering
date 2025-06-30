import { css } from '@emotion/react';
import { joinUrl } from '@guardian/libs';
import {
	type ArticleFormat,
	type ArticleTheme,
	Pillar,
} from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { useIsHorizontalScrollingSupported } from '../lib/useIsHorizontalScrollingSupported';
import { palette } from '../palette';
import type { OnwardsSource } from '../types/onwards';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { FetchOnwardsData } from './FetchOnwardsData.importable';
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
	background: ${palette('--article-section-background')};
`;

/**
 * The hard coded list of container URLs for the different pillars and editions.
 * For headlines and sport, we use the container IDs from the Network front for that section.
 * For opinion, culture and lifestyle, we use the container IDs from the editionalised front, where available.
 * Where we do not have editionalised pillars (Europe and International) we default to UK.
 */
const containerUrls = {
	headlines: {
		UK: 'e394b4df-85b2-4e94-aa9d-7ecf3baddee4',
		US: '52a630d9-751f-4db2-810e-f6753a6d8103',
		AU: '7ff637c4-f97e-4c11-b6e2-4194cd918ecc',
		INT: 'a8a0658c-7c83-4a54-b371-199f54d5412e',
		EUR: 'e38d1229-cd4a-47a8-a9a5-e3ba5f8fbf56',
	},
	sport: {
		UK: 'd6f18891-8199-4fe1-921c-25de032a8e8e',
		US: '940f2f34-6a46-4391-bf39-9c88b04939e9',
		AU: '84c9dd19-ecbd-4dde-b4e1-265a55f3c41b',
		INT: '8fa5c98d-cb94-4cf0-bb82-47f2df23f6ad',
		EUR: '380bce4e-d23e-48b8-847b-5ccda0c7a38b',
	},
	opinion: {
		UK: 'uk/commentisfree/regular-stories',
		US: 'us-alpha/contributors/feature-stories',
		AU: 'au/commentisfree/regular-stories',
		INT: 'uk/commentisfree/regular-stories',
		EUR: 'uk/commentisfree/regular-stories',
	},
	culture: {
		UK: 'uk/culture/regular-stories',
		US: 'us/culture/regular-stories',
		AU: 'au/culture/regular-stories',
		INT: 'uk/culture/regular-stories',
		EUR: 'uk/culture/regular-stories',
	},
	lifestyle: {
		UK: '5011-3940-8793-33a9',
		US: '93981db4-a44c-4ac1-aef1-914df6363a92',
		AU: '971c8921-ffc5-4b37-b561-305a27c4d01d',
		INT: '5011-3940-8793-33a9',
		EUR: '5011-3940-8793-33a9',
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
	absoluteServerTimes: boolean;
	renderingTarget: RenderingTarget;
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
	absoluteServerTimes,
	renderingTarget,
}: Props) => {
	const isHorizontalScrollingSupported = useIsHorizontalScrollingSupported();

	if (!isHorizontalScrollingSupported) return null;

	// Related content can be a collection of articles based on
	// two things, 1: A popular tag, or 2: A generic text match
	const tagToFilterBy = firstPopularTag(keywordIds, isPaidContent);

	// In this context, Blog tags are treated the same as Series tags
	const seriesTag = tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	let url: string | undefined;
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
				<Section
					fullWidth={false}
					title={"related content"}
					borderColour={palette('--article-border')}
				>
					<FetchOnwardsData
						url={url}
						limit={8}
						onwardsSource={onwardsSource}
						format={format}
						discussionApiUrl={discussionApiUrl}
						absoluteServerTimes={absoluteServerTimes}
						renderingTarget={renderingTarget}
						isAdFreeUser={isAdFreeUser}
					/>
				</Section>
			)}
			{!!curatedDataUrl && !isPaidContent && (
				<Section
					fullWidth={false}
					borderColour={palette('--article-border')}
				>
					<FetchOnwardsData
						url={curatedDataUrl}
						limit={20}
						onwardsSource="curated-content"
						format={format}
						discussionApiUrl={discussionApiUrl}
						absoluteServerTimes={absoluteServerTimes}
						renderingTarget={renderingTarget}
						isAdFreeUser={isAdFreeUser}
					/>
				</Section>
			)}
		</div>
	);
};

export { firstPopularTag };
