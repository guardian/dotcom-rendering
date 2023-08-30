import { RenderingTargetContext } from '../../src/components/RenderingTarget';

export const RenderingTargetDecorator = (Story, { args }) => {
	return (
		<RenderingTargetContext.Provider value={args.renderingTarget}>
			<Story />
		</RenderingTargetContext.Provider>
	);
};

export default RenderingTargetDecorator;
