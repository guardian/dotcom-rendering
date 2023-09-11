import type { Config } from '../../types/configContext';

/**
 * getConfig takes the given html element and returns its config attribute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the config attribute from;
 * @returns
 */
export const getConfig = (marker: HTMLElement): Config => {
	const serialised = marker.getAttribute('config');

	try {
		if (!serialised) {
			throw Error('Unable to fetch config attribute from marker element');
		} else {
			return JSON.parse(serialised) as Config;
		}
	} catch (error: unknown) {
		console.error(
			`🚨 Error parsing config. Is this data serialisable? ${String(
				serialised,
			)} 🚨`,
		);
		throw error;
	}
};
