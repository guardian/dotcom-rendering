import { parseURL } from './get-content-from-url.js';

describe('URL parser', () => {
	test('parse source URL when one query is present', () => {
		const req = {
			path: '/Article/https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true';

		const url = parseURL(req.path);

		expect(url?.href).toEqual(parsedURL);
	});

	test('parse source URL when multiple queries are present', () => {
		const req = {
			path: '/Article/https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true&dcr=true&live=true',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true&dcr=true&live=true';

		const url = parseURL(req.path);

		expect(url?.href).toEqual(parsedURL);
	});

	test('parse source URL when there are no queries', () => {
		const req = {
			path: '/Article/https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown';

		const url = parseURL(req.path);

		expect(url?.href).toEqual(parsedURL);
	});

	test('parse source URL for localhost/frontend', () => {
		const req = {
			path: '/Article/http://localhost:9000/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown',
		};
		const parsedURL =
			'http://localhost:9000/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown';

		const url = parseURL(req.path);

		expect(url?.href).toEqual(parsedURL);
	});

	test('parse URL returns undefined for assets', () => {
		const req = {
			path: '/assets/something.js',
		};

		const url = parseURL(req.path);

		expect(url).toBeUndefined();
	});

	test('parse URL returns undefined for static paths', () => {
		const req = {
			path: '/frontend/static/icon.svg',
		};

		const url = parseURL(req.path);

		expect(url).toBeUndefined();
	});
});
