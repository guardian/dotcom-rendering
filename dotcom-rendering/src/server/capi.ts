import express from "express";
import fetch from 'node-fetch';

const CAPI_URL = 'https://content.guardianapis.com';
const API_KEY = process.env.API_KEY || 'test';

export const capiContentRequest = (
	req: express.Request,
	res: express.Response,
): void => {
	console.log('content', req.body)
	const { tags } = req.body;
	const url = `${CAPI_URL}/search?api-key=${API_KEY}&show-fields=trailText,thumbnail&tag=${tags.map(tag => tag.id).join(',')}`;
	fetch(url)
		.then(response => response.json())
		.then(json => res.status(200).send(json.response.results))
		.catch(err => res.status(500).send(err))
}

export const capiTagRequest = (
	req: express.Request,
	res: express.Response,
): void => {
	console.log('tag', req.body)
	const { query } = req.body;
	const url = `${CAPI_URL}/tags?api-key=${API_KEY}&q=${query}`;
	fetch(url)
		.then(response => response.json())
		.then(json => res.status(200).send(json.response.results))
		.catch(err => res.status(500).send(err))
}

