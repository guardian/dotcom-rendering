import type { Page, Request } from '@playwright/test';

export const interceptOphanRequest = ({
	page,
	path,
	searchParamMatcher,
}: {
	page: Page;
	path: string;
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
