import { parseURL } from './get-content-from-url.js';

describe('URL parser', () => {
	test('parse DEV URL when one query is present', async () => {
		const req = {
			url: '/Article?url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown&filterKeyEvents=true',
			path: '/Article',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true';

		const url = parseURL(req.url, req.path);

		expect(url).toEqual(parsedURL);
	});

	test('parse DEV URL when multiple queries are present', async () => {
		const req = {
			url: '/Article?url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown&filterKeyEvents=true&dcr=true&live=true',
			path: '/Article',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true&dcr=true&live=true';

		const url = parseURL(req.url, req.path);

		expect(url).toEqual(parsedURL);
	});

	test('parse URL when there are 2 query string', async () => {
		const req = {
			url: '/Article?url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true',
			path: '/Article',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true';

		const url = parseURL(req.url, req.path);
		expect(url).toEqual(parsedURL);
	});

	test('parse URL when there is a query but no query string', async () => {
		const req = {
			url: 'https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown&filterKeyEvents=true&dcr=true&live=true',
			path: '',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true&dcr=true&live=true';

		const url = parseURL(req.url, req.path);
		expect(url).toEqual(parsedURL);
	});

	test('parse URL when there are no queries', async () => {
		const req = {
			url: 'https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown',
			path: '',
		};
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown';

		const url = parseURL(req.url, req.path);

		expect(url).toEqual(parsedURL);
	});
});
