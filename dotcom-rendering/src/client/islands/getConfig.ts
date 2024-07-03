import type { Config } from '../../types/configContext';

let config: Config | undefined;
/**
 * Reads the config from a JSON script tag,
 * or reuse the memoised value if it exists.
 *
 * @returns {Config} an immutable, global config
 */
export const getConfig = (): Readonly<Config> => {
	if (config) return config;

	const serialised = document.querySelector('script#config')?.innerHTML;

	try {
		if (!serialised) {
			throw Error('Unable to fetch config attribute from #config');
		} else {
			config = JSON.parse(serialised) as Config;
			return config;
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
