import { css } from '@emotion/react';
import {
	brandAltBackground,
	brandBackground,
	brandBorder,
	breakpoints,
} from '@guardian/source-foundations';
import { Section } from './Section';

export default {
	component: Section,
	title: 'Components/Section',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

const Grey = ({ heightInPixels = 400 }: { heightInPixels?: number }) => (
	<div
		css={css`
			background-color: lightgrey;
			width: 100%;
			height: ${heightInPixels}px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2em;
			font-weight: 200;
		`}
	>
		Insert content here
	</div>
);

export const PageTitleStory = () => {
	return (
		<Section
			title="No Children"
			showTopBorder={false}
			showSideBorders={false}
		/>
	);
};
PageTitleStory.story = { name: 'with no children' };

export const ContainerStory = () => {
	return (
		<Section
			title="Default Container"
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</Section>
	);
};
ContainerStory.story = { name: 'default container' };

export const NoTitleStory = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<Grey />
		</Section>
	);
};
NoTitleStory.story = { name: 'with no title' };

export const BordersStory = () => {
	return (
		<Section title="Borders" centralBorder="full">
			<Grey />
		</Section>
	);
};
BordersStory.story = { name: 'with all borders' };

export const LeftContentStory = () => {
	return (
		<Section
			title="Borders"
			centralBorder="full"
			leftContent={<Grey heightInPixels={200} />}
		>
			<Grey />
		</Section>
	);
};
LeftContentStory.story = {
	name: 'with an element passed into the left column',
};

export const BackgroundStory = () => {
	return (
		<Section
			title="Background Colour"
			description="About this content"
			fontColour={brandBackground.ctaPrimary}
			centralBorder="full"
			backgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
		>
			<Grey />
		</Section>
	);
};
BackgroundStory.story = { name: 'with a blue background' };

export const InnerBackgroundStory = () => {
	return (
		<Section
			title="Inner Background"
			description="About this content"
			fontColour={brandBackground.ctaPrimary}
			centralBorder="full"
			innerBackgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
		>
			<Grey />
		</Section>
	);
};
InnerBackgroundStory.story = {
	name: 'with a blue inner background',
};

export const DifferentBackgrounds = () => {
	return (
		<Section
			title="Tip us off"
			centralBorder="full"
			backgroundColour="#FFF280"
			borderColour={brandBorder.primary}
			innerBackgroundColour="#FFE501"
		>
			<h1>
				👀 Share stories with the Guardian securely and confidentially
			</h1>
		</Section>
	);
};
DifferentBackgrounds.story = {
	name: 'with inner background different to main background',
};

export const StretchRightStory = () => {
	return (
		<Section
			title="Stretched Right"
			description="About this content"
			centralBorder="full"
			stretchRight={true}
		>
			<Grey />
		</Section>
	);
};
StretchRightStory.story = {
	name: 'with content stretched to the right (no margin)',
};

export const PartialStory = () => {
	return (
		<Section title="Borders" showTopBorder={false} centralBorder="partial">
			<Grey />
		</Section>
	);
};
PartialStory.story = { name: 'with a partial border divider' };

export const SidesStory = () => {
	return (
		<Section
			title="NoSides"
			showTopBorder={false}
			centralBorder="full"
			padSides={false}
			padContent={false}
		>
			<Grey />
		</Section>
	);
};
SidesStory.story = { name: 'with a full border divider' };

export const ToggleableStory = () => {
	return (
		<Section
			title="Toggleable Container"
			toggleable={true}
			sectionId="sectionId"
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</Section>
	);
};
ToggleableStory.story = { name: 'toggleable container' };

export const MarginsStory = () => {
	return (
		<>
			<Section
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</Section>
			<Section
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</Section>
			<Section
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</Section>
		</>
	);
};
MarginsStory.story = { name: 'with no vertical margins' };

export const MultipleStory = () => {
	return (
		<>
			<Section title="Page Title" showTopBorder={false} />
			<Section title="Headlines" centralBorder="partial">
				<Grey />
			</Section>
			<Section title="Useful links" centralBorder="partial" />
			<Section
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				centralBorder="partial"
			>
				<Grey />
			</Section>
			<Section
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={brandAltBackground.primary}
			>
				<h2>Insert call to action here</h2>
			</Section>
			<Section
				title="Videos"
				fontColour="white"
				showTopBorder={false}
				backgroundColour="black"
				showSideBorders={false}
			>
				<Grey />
			</Section>
			<Section
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				centralBorder="partial"
			>
				<Grey />
			</Section>
		</>
	);
};
MultipleStory.story = {
	name: 'with multiple sections',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const TreatsStory = () => {
	return (
		<Section
			title="Treats"
			treats={[
				{
					links: [
						{
							text: 'The treat text',
							linkTo: '',
						},
					],
					editionId: 'UK',
				},
				{
					links: [
						{
							text: 'Another piece of text',
							linkTo: '',
						},
					],
					editionId: 'UK',
				},
			]}
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</Section>
	);
};
TreatsStory.story = {
	name: 'with treats',
};
