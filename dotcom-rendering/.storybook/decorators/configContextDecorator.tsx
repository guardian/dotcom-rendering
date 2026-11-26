import type { Decorator } from '@storybook/react-webpack5';
import { ConfigProvider } from '../../src/components/ConfigContext';
import type { Config } from '../../src/types/configContext';

const defaultConfig = {
	renderingTarget: 'Web',
	darkModeAvailable: false,
	assetOrigin: '/',
	editionId: 'UK',
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
