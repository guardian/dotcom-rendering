import { isUndefined } from '@guardian/libs';
import { type ArticleFormat } from '../lib/articleFormat';
import type { Block } from '../types/blocks';
import type {
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
	MarketingConsentEmail,
	Newsletter,
	NewsletterOrMarketingEmail,
} from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';
import { enhanceBlockquotes } from './enhance-blockquotes';
import { enhanceDisclaimer } from './enhance-disclaimer';
import { enhanceDividers } from './enhance-dividers';
import { enhanceDots } from './enhance-dots';
import { enhanceEmbeds } from './enhance-embeds';
import { enhanceH2s } from './enhance-H2s';
import { enhanceElementsImages, enhanceImages } from './enhance-images';
import { enhanceInteractiveContentsElements } from './enhance-interactive-contents-elements';
import { enhanceNumberedLists } from './enhance-numbered-lists';
import { enhanceTweets } from './enhance-tweets';
import { enhanceGuVideos } from './enhance-videos';
import { enhanceLists } from './enhanceLists';
import { enhanceTimeline } from './enhanceTimeline';
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

type Options = {
	renderingTarget: RenderingTarget;
	promotedNewsletter: Newsletter | undefined;
	imagesForLightbox: ImageForLightbox[];
	hasAffiliateLinksDisclaimer: boolean;
	audioArticleImage?: ImageBlockElement;
	tags?: TagType[];
};

// consents are hard-coded into the identity codebase:
// https://github.com/guardian/identity/blob/main/identity-model/src/main/scala/com/gu/identity/model/Consent.scala#L91
// https://github.com/guardian/identity/blob/main/docs/user-model.md
// https://github.com/guardian/identity/blob/main/docs/consents-model.md

// Mapping to an existing tag id is arbitrary.
// We could instead create a convention (eg campaign/marketing-email-promotion/{consentId})
// and have the required tags created
const marketingEmails: MarketingConsentEmail[] = [
	{
		id: 'jobs',
		name: 'Guardian Jobs',
		description:
			'Find your next job with the Guardian Jobs weekly email. Get the latest job listings, as well as tips and advice on taking your next career step.',
		promotionTagId: 'business/business', // for testing only
	},
];

const enhanceNewsletterSignup =
	(
		format: ArticleFormat,
		promotedNewsletter: Newsletter | undefined,
		blockId: string,
		tags?: TagType[],
	) =>
	(elements: FEElement[]): FEElement[] => {
		const tagIds = tags?.map((tag) => tag.id);
		const promotedMarketingEmail =
			tagIds &&
			marketingEmails.find(
				(email) =>
					email.promotionTagId &&
					tagIds.includes(email.promotionTagId),
			);

		const newsletterOrMarketingEmail:
			| NewsletterOrMarketingEmail
			| undefined = promotedMarketingEmail
			? { type: 'marketingConsent', data: promotedMarketingEmail }
			: promotedNewsletter
			? { type: 'newsletter', data: promotedNewsletter }
			: undefined;

		return !isUndefined(newsletterOrMarketingEmail)
			? insertPromotedNewsletter(
					elements,
					blockId,
					format,
					newsletterOrMarketingEmail,
			  )
			: elements;
	};

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// example: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceElements =
	(format: ArticleFormat, blockId: string, options: Options) =>
	(elements: FEElement[]): FEElement[] =>
		[
			enhanceLists(
				enhanceElements(format, blockId, options),
				options.tags,
			),
			enhanceTimeline(enhanceElements(format, blockId, options)),
			enhanceDividers,
			enhanceH2s,
			enhanceInteractiveContentsElements,
			enhanceBlockquotes(format),
			enhanceDots,
			enhanceImages(format, options.imagesForLightbox),
			enhanceNumberedLists(format),
			enhanceEmbeds,
			enhanceTweets,
			enhanceNewsletterSignup(
				format,
				options.promotedNewsletter,
				blockId,
				options.tags,
			),
			enhanceAdPlaceholders(format, options.renderingTarget),
			enhanceDisclaimer(options.hasAffiliateLinksDisclaimer),
		].reduce(
			(enhancedBlocks, enhancer) => enhancer(enhancedBlocks),
			elements,
		);

export const enhanceMainMedia =
	(
		format: ArticleFormat,
		imagesForLightbox: ImageForLightbox[],
		isMainMedia: boolean,
		mediaHTML: string,
	) =>
	(elements: FEElement[]): FEElement[] => {
		return [
			enhanceElementsImages(format, isMainMedia, imagesForLightbox),
			enhanceGuVideos(format, mediaHTML),
		].reduce(
			(enhancedBlocks, enhancer) => enhancer(enhancedBlocks),
			elements,
		);
	};

export const enhanceBlocks = (
	blocks: Block[],
	format: ArticleFormat,
	options: Options,
): Block[] => {
	const additionalElements: FEElement[] = [];
	if (options.audioArticleImage) {
		additionalElements.push(options.audioArticleImage);
	}
	return [
		...blocks.map((block) => ({
			...block,
			elements: enhanceElements(
				format,
				block.id,
				options,
			)([...block.elements, ...additionalElements]),
		})),
	];
};
