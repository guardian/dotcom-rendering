import type { RequestHandler } from 'express';
import { isProd } from '../components/marketing/lib/stage';

/**
 * Path of the Feast API's "Saved from web" endpoints. See ADR 0008 (Feast
 * API repo) for the design rationale behind this feature.
 */
const FEAST_API_SAVED_FROM_WEB_PATH = '/v2/saved-from-web';

const getFeastApiOrigin = (): string => {
	const stage = process.env.GU_STAGE?.toUpperCase();
	return isProd(stage)
		? 'https://recipes.guardianapis.com'
		: 'https://recipes.code.dev-guardianapis.com';
};

type ProxyResult = { status: number; body: unknown };

/**
 * Proxies a request to the Feast API's "Saved from web" endpoints,
 * forwarding the reader's own bearer token as-is. DCR does not hold any
 * separate credentials for this call: the token the reader already has is
 * what the Feast API uses to authorise the request. The browser never talks
 * to the Feast API directly, which avoids needing Feast API-side CORS
 * configuration for DCR's origins.
 */
const proxyToFeastApi = async (
	path: string,
	method: 'GET' | 'PUT',
	authorizationHeader: string | undefined,
): Promise<ProxyResult> => {
	if (!authorizationHeader) {
		return {
			status: 401,
			body: { message: 'Missing Authorization header' },
		};
	}

	const response = await fetch(`${getFeastApiOrigin()}${path}`, {
		method,
		headers: {
			Authorization: authorizationHeader,
		},
	});

	if (response.status === 204) {
		return { status: response.status, body: undefined };
	}

	const body: unknown = await response.json().catch(() => undefined);
	return { status: response.status, body };
};

/**
 * GET /api/saved-from-web
 * Proxies to the Feast API to fetch the reader's full list of recipe ids
 * saved to their "Saved from web" list.
 */
export const handleGetSavedFromWeb: RequestHandler = async (req, res) => {
	try {
		const { status, body } = await proxyToFeastApi(
			FEAST_API_SAVED_FROM_WEB_PATH,
			'GET',
			req.headers.authorization,
		);
		res.status(status).json(body ?? []);
	} catch (error) {
		console.error(
			'[handleGetSavedFromWeb] Error proxying to Feast API:',
			error,
		);
		res.status(502).json({ message: 'Error contacting Feast API' });
	}
};

/**
 * PUT /api/saved-from-web/:recipeId
 * Proxies to the Feast API to add a recipe to the reader's "Saved from web"
 * list, creating the list on first use. Idempotent.
 */
export const handlePutSavedFromWebRecipe: RequestHandler = async (req, res) => {
	const { recipeId } = req.params;
	if (!recipeId || Array.isArray(recipeId)) {
		res.status(400).json({ message: 'Missing recipeId' });
		return;
	}

	try {
		const { status, body } = await proxyToFeastApi(
			`${FEAST_API_SAVED_FROM_WEB_PATH}/${encodeURIComponent(recipeId)}`,
			'PUT',
			req.headers.authorization,
		);
		if (body === undefined) {
			res.status(status).end();
		} else {
			res.status(status).json(body);
		}
	} catch (error) {
		console.error(
			'[handlePutSavedFromWebRecipe] Error proxying to Feast API:',
			error,
		);
		res.status(502).json({ message: 'Error contacting Feast API' });
	}
};
