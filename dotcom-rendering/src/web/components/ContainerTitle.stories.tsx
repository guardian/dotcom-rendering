import { ContainerTitle } from './ContainerTitle';

export default {
	component: ContainerTitle,
	title: 'Components/ContainerTitle',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

export const DefaultStory = () => {
	return <ContainerTitle title="Title text" />;
};
DefaultStory.story = { name: 'with defaults' };

export const DescriptionStory = () => {
	return (
		<ContainerTitle title="Title text" description="About this content" />
	);
};
DescriptionStory.story = { name: 'with description' };

export const ColouredStory = () => {
	return (
		<ContainerTitle
			title="Title text"
			description="About this content"
			fontColour="green"
		/>
	);
};
ColouredStory.story = { name: 'with colour' };

export const LinkStory = () => {
	return (
		<ContainerTitle
			title="Title text"
			description="About this content"
			url="https://www.theguardian.com"
		/>
	);
};
LinkStory.story = { name: 'with a link' };
