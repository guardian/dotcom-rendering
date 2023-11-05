import type { BrowserContext, Cookie } from '@playwright/test';

// Playwright does not currently have a useful method for removing a single cookie
// so this workaround is required
const clearCookie = async (
	context: BrowserContext,
	cookieName: string,
): Promise<void> => {
	const cookies = await context.cookies();
	const filteredCookies = cookies.filter(
		(cookie: Cookie) => cookie.name !== cookieName,
	);
	await context.clearCookies();
	await context.addCookies(filteredCookies);
};

export { clearCookie };
