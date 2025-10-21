import { ContainerTitle } from './ContainerTitle';

export default {
	component: ContainerTitle,
	title: 'Components/ContainerTitle',
	globals: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			value: 'doesNotExist',
			isRotated: false,
		},
	},
};

export const DefaultStory = () => {
	return <ContainerTitle title="Title text" />;
};
DefaultStory.storyName = 'with defaults';

export const DescriptionStory = () => {
	return (
		<ContainerTitle title="Title text" description="About this content" />
	);
};
DescriptionStory.storyName = 'with description';

export const ColouredStory = () => {
	return (
		<ContainerTitle
			title="Title text"
			description="About this content"
			fontColour="green"
		/>
	);
};
ColouredStory.storyName = 'with colour';

export const LinkStory = () => {
	return (
		<ContainerTitle
			title="Title text"
			description="About this content"
			url="https://www.theguardian.com"
		/>
	);
};
LinkStory.storyName = 'with a link';
