import type { ArticleFormat } from '@guardian/libs';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceElementsImages } from '../model/enhance-images';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import { type DCRArticle } from '../types/frontend';
import { type RenderingTarget } from '../types/renderingTarget';
import { decideFormat } from './decideFormat';

const enhancePinnedPost = (
	format: ArticleFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
) => {
	if (!block) return;
	return enhanceBlocks([block], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
	})[0];
};

export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): DCRArticle => {
	const data = validateAsArticleType(body);
	const format = decideFormat(data.format);

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, data.mainMediaElements)
		: [];

	// Tidy up this horror after the Oscars
	const getOscarsNewsletter = () => {
		if (
			// variant1
			data.config.abTests.filmTodayVariant
		) {
			return {
				identityName: 'film-today-variant-1',
				name: 'Film Weekly Variant 1',
				theme: 'news',
				description: 'All the latest movie news, reviews and features',
				frequency: 'Every week',
				listId: 4144,
				group: 'Culture',
				successDescription: "We'll send you Film Weekly every Friday",
			};
		}

		if (
			// variant2
			data.config.abTests.filmTodayControl
		) {
			return {
				identityName: 'film-today-variant-2',
				name: 'Film Weekly Variant 2',
				theme: 'news',
				description: 'All the latest movie news, reviews and features',
				frequency: 'Every week',
				listId: 4144,
				group: 'Culture',
				successDescription: "We'll send you Film Weekly every Friday",
			};
		}

		// control: does this need to be a different x% test bucket?
		return {
			identityName: 'film-today-control',
			name: 'Film Weekly Control',
			theme: 'news',
			description: 'All the latest movie news, reviews and features',
			frequency: 'Every week',
			listId: 4144,
			group: 'Culture',
			successDescription: "We'll send you Film Weekly every Friday",
		};
	};

	const enhancedBlocks = enhanceBlocks(data.blocks, format, {
		renderingTarget,
		promotedNewsletter:
			data.webURL ===
			'https://www.theguardian.com/film/2023/mar/12/oscars-winners-2023-list-in-full-latest-awards-actor-best-picture'
				? getOscarsNewsletter()
				: data.promotedNewsletter,
		imagesForLightbox,
	});

	const mainMediaElements = enhanceElementsImages(
		format,
		imagesForLightbox,
	)(data.mainMediaElements);

	return {
		...data,
		mainMediaElements,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(format, renderingTarget, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.showTableOfContents
			? enhanceTableOfContents(enhancedBlocks)
			: undefined,
		/**
		 * This function needs to run at a higher level to most other enhancers
		 * because it needs both mainMediaElements and blocks in scope
		 */
		imagesForLightbox,
		imagesForAppsLightbox: appsLightboxImages(imagesForLightbox),
	};
};
