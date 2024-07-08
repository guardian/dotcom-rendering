import { safeParse } from 'valibot';
import type { Config } from '../../types/configContext';
import { configSchema, defaultConfig } from '../../types/configContext';

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
			const result = safeParse(configSchema, serialised);
			if (!result.success) {
				console.error(
					`🚨 Error parsing ${String(
						serialised,
					)} config with valibot🚨`,
				);
				return defaultConfig;
			}
			return result.output;
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
