import type { BrowserContext, Cookie } from '@playwright/test';

const addCookie = async (
	context: BrowserContext,
	cookie: {
		name: string;
		value: string;
		expires?: number;
	},
): Promise<void> => {
	return context.addCookies([
		{
			name: cookie.name,
			value: cookie.value,
			expires: cookie.expires,
			domain: 'localhost',
			path: '/',
		},
	]);
};

/**
 * Clear a single cookie
 *
 * Playwright does not currently have a method for removing a single cookie
 */
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

export { addCookie, clearCookie };
