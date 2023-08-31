import { RenderingContext } from '../../src/components/RenderingContext';

const defaultContext = { target: 'Web' };

export const RenderingContextDecorator = (
	Story,
	{ args: { renderingContext } },
) => {
	const context = { ...defaultContext, ...renderingContext };

	// For easy debugging
	console.log('Storybook rendering context: \n', context);

	return (
		<RenderingContext.Provider value={context}>
			<Story />
		</RenderingContext.Provider>
	);
};
