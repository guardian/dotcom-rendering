import type { BrowserContext } from '@playwright/test';

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

export { addCookie };
