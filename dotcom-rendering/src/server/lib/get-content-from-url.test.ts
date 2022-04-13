import { parseURL } from "./get-content-from-url";

describe('URL parser', () => {
	test('parse DEV env query params correctly when one query is present', async () => {
		const req = { url: "/Article?url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown&filterKeyEvents=true", path: "/Article" }
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true';

		const url = parseURL(req.url, req.path);

		expect(url).toEqual(parsedURL);
	})

	test('parse DEV env query params correctly when multiple queries are present', async () => {
		const req = { url: "/Article?url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Flive%2F2022%2Fapr%2F13%2Fboris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown&filterKeyEvents=true&dcr=true&live=true", path: "/Article" }
		const parsedURL =
			'https://www.theguardian.com/politics/live/2022/apr/13/boris-johnson-uk-politics-live-rishi-sunak-partygate-lockdown?filterKeyEvents=true&dcr=true&live=true';

		const url = parseURL(req.url, req.path);

		expect(url).toEqual(parsedURL);
	})

});
