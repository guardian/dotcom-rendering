import type { NextFunction, Request, Response } from 'express';
import { render as renderAMPArticle } from '../amp/server';
import {
	renderArticle,
	renderArticleJson,
	renderBlocks,
	renderFront,
	renderFrontJson,
	renderInteractive,
	renderKeyEvents,
} from '../web/server';

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = () => {
	return (req: Request, res: Response, next: NextFunction): void => {
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
			case '/KeyEvents':
				return renderKeyEvents(req, res);
			case '/Front':
				return renderFront(req, res);
			case '/FrontJSON':
				return renderFrontJson(req, res);
			default:
				next();
		}
	};
};
