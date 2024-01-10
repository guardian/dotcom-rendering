// Default to PROD to avoid risk of showing test data to users
export const isProd = (stage?: string): boolean =>
	!(stage === 'CODE' || stage === 'DEV');
