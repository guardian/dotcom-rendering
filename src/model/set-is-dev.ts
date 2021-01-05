export const setIsDev = (data: CAPIType): CAPIType => ({
	...data,
	config: {
		...data.config,
		isDev: process.env.NODE_ENV !== 'production',
	},
});
