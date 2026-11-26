import type { ArticleFormat } from '../lib/articleFormat';
import type { Block } from '../types/blocks';
import type { StageType } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
import { enhanceBlocks } from './enhanceBlocks';

export const enhancePinnedPost = (
	format: ArticleFormat,
	renderingTarget: RenderingTarget,
	pinnedPost: Block | undefined,
	pageId: string,
	stage: StageType,
): Block | undefined => {
	if (pinnedPost === undefined) {
		return undefined;
	}

	return enhanceBlocks([pinnedPost], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
		hasAffiliateLinksDisclaimer: false,
		shouldHideAds: false,
		pageId,
		stage,
	})[0];
};
