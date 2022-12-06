// ----- Imports ----- //

import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import type { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import type { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import type { Option } from '@guardian/types';
import { andThen, fromNullable, none, some } from '@guardian/types';
import { fromString as dateFromString } from 'date';
import { parseImage } from 'image';
import { isLabs } from 'item';
import { pipe } from 'lib';
import { MainMediaKind } from 'mainMedia';
import type { MainMedia } from 'mainMedia';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import { parseVideo } from 'video';

// ----- Lookups ----- //

interface Series {
	webTitle?: string;
	webUrl?: string;
}

interface Logo {
	src: string;
	url: string;
	alt: string;
}

const tagsOfType =
	(tagType: TagType) =>
	(tags: Tag[]): Tag[] =>
		tags.filter((tag: Tag) => tag.type === tagType);

const isImmersive = (content: Content): boolean =>
	content.fields?.displayHint === 'immersive';

const isInteractive = (content: Content): boolean =>
	content.type === ContentType.INTERACTIVE;

const isPhotoEssay = (content: Content): boolean =>
	content.fields?.displayHint === 'photoEssay';

const isFeature = (content: Content): boolean =>
	content.tags.some((tag) => tag.id === 'tone/features');

const isAnalysis = (content: Content): boolean =>
	content.tags.some((tag) => tag.id === 'tone/analysis');

const articleSeries = (content: Content): Option<Tag> => {
	const type = isLabs(content.tags) ? TagType.PAID_CONTENT : TagType.SERIES;
	return fromNullable(tagsOfType(type)(content.tags)[0]);
};

const articleContributors = (content: Content): Tag[] =>
	tagsOfType(TagType.CONTRIBUTOR)(content.tags);

const isImage = (elem: BlockElement): boolean =>
	elem.type === ElementType.IMAGE;

const isVideo = (elem: BlockElement): boolean =>
	elem.type === ElementType.CONTENTATOM &&
	elem.contentAtomTypeData?.atomType === 'media';

const articleMainImage = (content: Content): Optional<BlockElement> =>
	Optional.fromNullable(
		(content.blocks?.main?.elements.filter(isImage) ?? [])[0],
	);

const articleMainVideo = (content: Content): Optional<BlockElement> =>
	Optional.fromNullable(
		(content.blocks?.main?.elements.filter(isVideo) ?? [])[0],
	);

const articleMainMedia = (
	content: Content,
	context: Context,
): Optional<MainMedia> => {
	return (content.blocks?.main?.elements.filter(isImage) ?? [])[0]
		? articleMainImage(content)
				.flatMap(parseImage(context))
				.map<MainMedia>((image) => ({
					kind: MainMediaKind.Image,
					image,
				}))
		: articleMainVideo(content)
				.flatMap(parseVideo(content.atoms))
				.map<MainMedia>((video) => ({
					kind: MainMediaKind.Video,
					video,
				}));
};

type ThirdPartyEmbeds = {
	twitter: boolean;
	youtube: boolean;
	instagram: boolean;
	spotify: boolean;
};

const noThirdPartyEmbeds: ThirdPartyEmbeds = {
	twitter: false,
	youtube: false,
	instagram: false,
	spotify: false,
};

const getGenericThirdPartyEmbeds = (
	thirdPartyEmbeds: ThirdPartyEmbeds,
	element: BlockElement,
): ThirdPartyEmbeds => {
	if (element.embedTypeData?.source === 'Instagram') {
		return { ...thirdPartyEmbeds, instagram: true };
	}
	return thirdPartyEmbeds;
};

const checkForThirdPartyEmbed = (
	thirdPartyEmbeds: ThirdPartyEmbeds,
	element: BlockElement,
): ThirdPartyEmbeds => {
	switch (element.type) {
		case ElementType.EMBED:
			return getGenericThirdPartyEmbeds(thirdPartyEmbeds, element);
		case ElementType.INSTAGRAM:
			return { ...thirdPartyEmbeds, instagram: true };
		case ElementType.TWEET:
			return { ...thirdPartyEmbeds, twitter: true };
		case ElementType.VIDEO:
			return { ...thirdPartyEmbeds, youtube: true };
		case ElementType.AUDIO:
			return { ...thirdPartyEmbeds, spotify: true };
		default:
			return thirdPartyEmbeds;
	}
};

const getThirdPartyEmbeds = (content: Content): ThirdPartyEmbeds => {
	const body = content.blocks?.body;
	if (!body) {
		return noThirdPartyEmbeds;
	}
	return body.reduce(
		(thirdPartyEmbeds, block) =>
			block.elements.reduce(checkForThirdPartyEmbed, thirdPartyEmbeds),
		noThirdPartyEmbeds,
	);
};

const requiresInlineStyles = (content: Content): boolean => {
	// return !!(
	//	   content.fields?.commentable ??
	//	   content.atoms?.quizzes ??
	//	   content.atoms?.audios ??
	//	   content.atoms?.charts
	// );
	return false;
};

const paidContentLogo = (tags: Tag[]): Option<Logo> => {
	const sponsorship = tags
		.find((tag) => tag.type === TagType.PAID_CONTENT)
		?.activeSponsorships?.pop();
	const src = sponsorship?.sponsorLogo;
	const url = sponsorship?.sponsorLink;
	const alt = sponsorship?.sponsorName ?? '';
	return !src || !url ? none : some({ src, url, alt });
};

// ----- Functions ----- //

const capiEndpoint = (articleId: string, key: string): string => {
	// If you need a new field here, MAPI probably also needs updating
	const fields = [
		'headline',
		'standfirst',
		'bylineHtml',
		'firstPublicationDate',
		'shouldHideAdverts',
		'shouldHideReaderRevenue',
		'displayHint',
		'starRating',
		'commentable',
		'internalShortId',
		'liveBloggingNow',
		'lastModified',
		'isInappropriateForSponsorship',
	];

	const params = new URLSearchParams({
		format: 'thrift',
		'api-key': key,
		'show-atoms': 'all',
		'show-fields': fields.join(','),
		'show-tags': 'all',
		'show-blocks': 'all',
		'show-elements': 'all',
		'show-related': 'true',
		'show-references': 'all',
	});

	return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
};

const capiDateTimeToDate = (date: CapiDateTime): Option<Date> =>
	// Thrift definitions define some dates as CapiDateTime but CAPI returns strings
	dateFromString(date.iso8601);

const maybeCapiDate = (date: CapiDateTime | undefined): Option<Date> =>
	pipe(date, fromNullable, andThen(capiDateTimeToDate));

/**
 * Return a mock `Newsletter` if `content` contains a newsletter tag
 * @param content the content to check for presence of a newsletter tag
 * @returns a mock `Newsletter`, or `undefined` if `content` does not include a newsletter tag
 */
const getMockPromotedNewsletter = (
	content: Content,
): Newsletter | undefined => {
	const newsletterTagPrefix = 'campaign/email/';
	const newsletterTag = tagsOfType(TagType.CAMPAIGN)(content.tags).find(
		(campaignTag) => campaignTag.id.startsWith(newsletterTagPrefix),
	);

	if (newsletterTag) {
		return {
			description: 'Test newsletter',
			frequency: 'test',
			identityName: 'invalid',
			name: `Test: ${newsletterTag.id}`,
			successDescription: 'test',
			theme: 'news',
		};
	}
};

// ----- Exports ----- //

export {
	Series,
	Logo,
	ThirdPartyEmbeds,
	isPhotoEssay,
	isImmersive,
	isInteractive,
	isFeature,
	isAnalysis,
	articleSeries,
	articleContributors,
	articleMainMedia,
	articleMainVideo,
	capiEndpoint,
	getThirdPartyEmbeds,
	maybeCapiDate,
	paidContentLogo,
	articleMainImage,
	checkForThirdPartyEmbed,
	requiresInlineStyles,
	getMockPromotedNewsletter,
};
