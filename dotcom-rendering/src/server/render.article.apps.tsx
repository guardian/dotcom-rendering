import { isString } from '@guardian/libs';
import { ArticlePage } from '../components/ArticlePage';
import { generateScriptTags, getPathFromManifest } from '../lib/assets';
import { decideFormat } from '../lib/decideFormat';
import { renderToStringWithEmotion } from '../lib/emotion';
import { createGuardian } from '../model/guardian';
import type { FEArticleType } from '../types/frontend';
import { htmlPageTemplate } from './htmlPageTemplate';

export const renderArticle = (
	article: FEArticleType,
): {
	clientScripts: string[];
	html: string;
} => {
	const format: ArticleFormat = decideFormat(article.format);

	const { html, extractedCss } = renderToStringWithEmotion(
		<ArticlePage
			format={format}
			article={article}
			renderingTarget="Apps"
		/>,
	);

	const clientScripts = [getPathFromManifest('apps', 'index.js')];
	const scriptTags = generateScriptTags([...clientScripts].filter(isString));

	const guardian = createGuardian({
		editionId: article.editionId,
		stage: article.config.stage,
		frontendAssetsFullURL: article.config.frontendAssetsFullURL,
		revisionNumber: article.config.revisionNumber,
		sentryPublicApiKey: article.config.sentryPublicApiKey,
		sentryHost: article.config.sentryHost,
		keywordIds: article.config.keywordIds,
		dfpAccountId: article.config.dfpAccountId,
		adUnit: article.config.adUnit,
		ajaxUrl: article.config.ajaxUrl,
		googletagUrl: article.config.googletagUrl,
		switches: article.config.switches,
		abTests: article.config.abTests,
		isPaidContent: article.pageType.isPaidContent,
		contentType: article.contentType,
		googleRecaptchaSiteKey: article.config.googleRecaptchaSiteKey,
		unknownConfig: article.config,
	});

	const renderedPage = htmlPageTemplate({
		css: extractedCss,
		html,
		title: article.webTitle,
		scriptTags,
		guardian,
		renderingTarget: 'Apps',
		offerHttp3: false,
		weAreHiring: !!article.config.switches.weAreHiring,
	});

	return {
		clientScripts,
		html: renderedPage,
	};
};
