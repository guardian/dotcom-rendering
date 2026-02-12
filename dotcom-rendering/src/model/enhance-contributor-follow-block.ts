import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import type {
	ContributorFollowBlockElement,
	FEElement,
} from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';

const PARAGRAPH_POSITION = 4;

const isParagraph = (element: FEElement): boolean =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

export const enhanceContributorFollowBlock =
	(
		format: ArticleFormat,
		renderingTarget: RenderingTarget,
		tags: TagType[] | undefined,
		byline: string | undefined,
	) =>
	(elements: FEElement[]): FEElement[] => {
		// TODO: Gate on A/B test before enabling
		return elements;

		if (renderingTarget !== 'Apps') {
			return elements;
		}

		if (format.design !== ArticleDesign.Comment) {
			return elements;
		}

		const soleContributor = getSoleContributor(tags ?? [], byline);
		if (!soleContributor) {
			return elements;
		}

		let paragraphCount = 0;
		let insertPosition: number | null = null;

		for (let i = 0; i < elements.length; i++) {
			if (isParagraph(elements[i]!)) {
				paragraphCount++;
				if (paragraphCount === PARAGRAPH_POSITION) {
					insertPosition = i + 1;
					break;
				}
			}
		}

		// If an article has <= 4 paragraphs, insert at the end
		if (insertPosition === null) {
			insertPosition = elements.length;
		}

		const contributorFollowBlockElement: ContributorFollowBlockElement = {
			_type: 'model.dotcomrendering.pageElements.ContributorFollowBlockElement',
			elementId: `contributor-profile-${soleContributor.id}`,
			contributorId: soleContributor.id,
			displayName: soleContributor.title,
			avatarUrl: soleContributor.bylineLargeImageUrl,
			bio: soleContributor.bio,
		};

		return [
			...elements.slice(0, insertPosition),
			contributorFollowBlockElement,
			...elements.slice(insertPosition),
		];
	};
