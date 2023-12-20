import React from 'react';
import { ConfigProvider } from '../../src/components/ConfigContext';
import type { Decorator } from '@storybook/react';
import { Config } from '../../src/types/configContext';

const defaultConfig = {
	renderingTarget: 'Web',
	darkModeAvailable: false,
} satisfies Config;

export const ConfigContextDecorator: Decorator<{
	config: Config;
}> = (Story, { parameters: { config } }) => {
	const context = { ...defaultConfig, ...config };

	return (
		<ConfigProvider value={context}>
			<Story />
		</ConfigProvider>
	);
};
