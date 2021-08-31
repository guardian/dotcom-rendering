import { Configuration } from 'webpack';
import { clientConfig } from '../webpack.config';

export default async ({
	config,
}: {
	config: Configuration;
}): Promise<Configuration> => {
	return {
		...config,
		target: clientConfig?.target,
		resolve: {
			...clientConfig?.resolve,
			// Used by image-rendering to hash image signatures.
			// This IR code path shouldn't be hit in Storybook
			// because we use pre-built image URLs in our stories.
			// Therefore we don't need to provide/polyfill crypto.
			fallback: { crypto: false },
		},
		module: {
			rules: clientConfig?.module?.rules ?? [],
		},
		plugins: [...(config.plugins ?? [])],
	};
};
