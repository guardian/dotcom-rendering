import type { FEArticleType } from '../types/frontend';
import { isRecipe } from './enhance-recipes';
import { enhanceBlocks } from './enhanceBlocks';
import { enhanceCommercialProperties } from './enhanceCommercialProperties';
import { enhanceStandfirst } from './enhanceStandfirst';
import { enhanceTableOfContents } from './enhanceTableOfContents';
import { validateAsArticleType } from './validate';

const enhancePinnedPost = (format: CAPIFormat, block?: Block) => {
	return block ? enhanceBlocks([block], format)[0] : block;
};

export const enhanceArticle = (body: unknown): FEArticleType => {
	const data = validateAsArticleType(body);

	const enhancedBlocks = enhanceBlocks(data.blocks, data.format, {
		promotedNewsletter: data.promotedNewsletter,
		isRecipe: isRecipe(data.tags),
	});

	const CAPIArticle: FEArticleType = {
		...data,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.config.switches.tableOfContents
			? enhanceTableOfContents(data.format, enhancedBlocks)
			: undefined,
	};
	return CAPIArticle;
};
