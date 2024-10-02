import type { Page, Request } from '@playwright/test';

const IMPRESSION_REQUEST_PATH = 'img/1';
const ADDITIONAL_REQUEST_PATH = 'img/2';

const interceptOphanRequest = ({
	page,
	path,
	searchParamMatcher,
}: {
	page: Page;
	path: typeof IMPRESSION_REQUEST_PATH | typeof ADDITIONAL_REQUEST_PATH;
	searchParamMatcher: (searchParams: URLSearchParams) => boolean;
}): Promise<Request> => {
	return page.waitForRequest((request) => {
		const matchUrl = request
			.url()
			.startsWith(`https://ophan.theguardian.com/${path}`);
		const searchParams = new URLSearchParams(request.url());
		return matchUrl && searchParamMatcher(searchParams);
	});
};

export {
	IMPRESSION_REQUEST_PATH,
	ADDITIONAL_REQUEST_PATH,
	interceptOphanRequest,
};
