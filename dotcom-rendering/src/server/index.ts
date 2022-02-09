import { render as renderAMPArticle } from '../amp/server';
import {
	renderArticle,
	renderArticleJson,
	renderBlocks,
	renderInteractive,
} from '../web/server';
import { prodServer } from './prod-server';

// this export is the function used by webpackHotServerMiddleware in /scripts/frontend-dev-server
export default (options: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	switch (options.path) {
		case '/Article':
			return renderArticle;
		case '/ArticleJson':
			return renderArticleJson;
		case '/AMPArticle':
			return renderAMPArticle;
		case '/Interactive':
			return renderInteractive;
		case '/AMPInteractive':
			return renderAMPArticle;
		case '/Blocks':
			return renderBlocks;
	}

	return renderArticle;
};

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	prodServer();
}
