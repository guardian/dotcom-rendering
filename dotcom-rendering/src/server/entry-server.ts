import { renderAmpArticle } from '../amp/server';
import { enhanceArticle } from '../model/enhanceArticle';
import { enhanceFront } from '../model/enhanceFront';
import { articleToHtml } from '../web/server/articleToHtml';
import { frontToHtml } from '../web/server/frontToHtml';

type Renderer = (data: unknown) => string;

export const renderAmpHtml: Renderer = renderAmpArticle;

export const renderArticleHtml: Renderer = (data) => {
	const article = enhanceArticle(data);

	return articleToHtml({ article });
};

export const renderFrontHtml: Renderer = (data) => {
	const front = enhanceFront(data);

	return frontToHtml({ front });
};
