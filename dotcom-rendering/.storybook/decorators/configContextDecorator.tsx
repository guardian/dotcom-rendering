import { ConfigProvider } from '../../src/components/ConfigContext';
import type { Decorator } from '@storybook/react';
import { Config } from '../../src/types/configContext';

const defaultConfig = { renderingTarget: 'Web', darkModeAvailable: false } satisfies Config;

export const ConfigContextDecorator: Decorator<{
	config: Config;
}> = (Story, { args: { config } }) => {
	const context = { ...defaultConfig, ...config };

	// For easy debugging
	console.log('Storybook application config: \n', context);

	return (
		<ConfigProvider value={context}>
			<Story />
		</ConfigProvider>
	);
};
