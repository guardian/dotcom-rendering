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
		resolve: clientConfig?.resolve,
		module: {
			rules: clientConfig?.module?.rules ?? [],
		},
		plugins: [...(config.plugins ?? [])],
	};
};
