import { ConfigProvider } from '../../src/components/ConfigContext';

const defaultConfig = { renderingTarget: 'Web' };

export const ConfigContextDecorator = (Story, { args: { config } }) => {
	const context = { ...defaultConfig, ...config };

	// For easy debugging
	console.log('Storybook application config: \n', context);

	return (
		<ConfigProvider value={context}>
			<Story />
		</ConfigProvider>
	);
};
