import type { Request, Response, NextFunction } from 'express';
import { render as renderAMPArticle } from '../amp/server';
import {
	renderArticle,
	renderArticleJson,
	renderBlocks,
	renderInteractive,
} from '../web/server';

// see https://www.npmjs.com/package/webpack-hot-server-Middleware
// for more info
export const devServer = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		switch (req.path) {
			case '/Article':
				return renderArticle(req, res);
			case '/ArticleJson':
				return renderArticleJson(req, res);
			case '/AMPArticle':
				return renderAMPArticle(req, res);
			case '/Interactive':
				return renderInteractive(req, res);
			case '/AMPInteractive':
				return renderAMPArticle(req, res);
			case '/Blocks':
				return renderBlocks(req, res);
			default:
				next();
		}
	};
};
