import type { NextFunction, Request, Response } from 'express';
import { render as renderAMPArticle } from '../amp/server';
import {
	renderArticle,
	renderArticleJson,
	renderBlocks,
	renderFront,
	renderInteractive,
	renderKeyEvents,
} from '../web/server';
import {capiContentRequest, capiTagRequest} from "./capi";

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
			case '/KeyEvents':
				return renderKeyEvents(req, res);
			case '/Front':
				return renderFront(req, res);
			case '/capi/content':
				return capiContentRequest(req, res);
			case '/capi/tag':
				return capiTagRequest(req, res);
			default:
				next();
		}
	};
};
