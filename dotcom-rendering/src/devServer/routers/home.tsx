import { type Request, Router } from 'express';
import { error, ok, type Result } from '../../lib/result';
import { validateAsFEArticle } from '../../model/validate';
import { type Article, enhanceArticleType } from '../../types/article';
import { Home } from '../docs/home';
import { sendReact } from '../send';

export const home = Router();

home.get('/', async (req, res, next) => {
	const dotcomURL = parseUrl(req);

	if (dotcomURL.kind === 'ok') {
		const article = await extractArticle(dotcomURL.value);

		return sendReact('Home', <Home articles={[article]} />)(req, res, next);
	} else if (dotcomURL.error.kind === 'noParameter') {
		return sendReact('Home', <Home articles={[]} />)(req, res, next);
	} else {
		console.error(dotcomURL.error.message);
		res.sendStatus(400);
	}
});

const parseUrl = (req: Request): Result<UrlError, URL> => {
	const param = req.query.dotcomURL;

	if (param === undefined) {
		return error({ kind: 'noParameter' });
	}

	if (typeof param !== 'string') {
		return error({
			kind: 'parseError',
			message:
				"'dotcomURL' query parameter must contain a single string.",
		});
	}

	try {
		const url = new URL(param);

		if (url.host !== 'www.theguardian.com' || url.protocol !== 'https:') {
			return error({
				kind: 'parseError',
				message:
					"'dotcomURL' must start with 'https://www.theguardian.com'",
			});
		}

		return ok(url);
	} catch (_e) {
		return error({
			kind: 'parseError',
			message: `Could not parse the 'dotcomURL' query parameter. Received: ${param}, expected: a valid URL string.`,
		});
	}
};

type UrlError =
	| {
			kind: 'noParameter';
	  }
	| {
			kind: 'parseError';
			message: string;
	  };

const extractArticle = async (dotcomURL: URL): Promise<Article> => {
	const url = new URL(dotcomURL);
	url.pathname = `${url.pathname}.json`;
	url.searchParams.append('dcr', 'true');

	const json = await fetch(url).then((res) => res.json());
	const frontendData = validateAsFEArticle(json);

	return enhanceArticleType(frontendData, 'Web');
};
