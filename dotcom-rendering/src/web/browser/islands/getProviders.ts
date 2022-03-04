const providers = ['WithABProvider'] as const;

export type Provider = typeof providers[number];

const isProvider = (provider: string): provider is Provider =>
	// @ts-expect-error -- we are testing whether it’s incldued
	providers.includes(provider);

/**
 * getProviders gets the providers needed
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the name attribute from;
 * @returns
 */
export const getProviders = (marker: HTMLElement): Provider[] | undefined =>
	marker.getAttribute('providers')?.split(',').filter(isProvider);
