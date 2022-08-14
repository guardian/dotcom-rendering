import { css } from '@emotion/react';
import {
	brandAltBackground,
	brandBackground,
	brandBorder,
	breakpoints,
} from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';

export default {
	component: ContainerLayout,
	title: 'Components/ContainerLayout',
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
		<ContainerLayout
			title="No Children"
			showTopBorder={false}
			showSideBorders={false}
		/>
	);
};
PageTitleStory.story = { name: 'with no children' };

export const ContainerStory = () => {
	return (
		<ContainerLayout
			title="Default Container"
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</ContainerLayout>
	);
};
ContainerStory.story = { name: 'default container' };

export const NoTitleStory = () => {
	return (
		<ContainerLayout showTopBorder={false} showSideBorders={false}>
			<Grey />
		</ContainerLayout>
	);
};
NoTitleStory.story = { name: 'with no title' };

export const BordersStory = () => {
	return (
		<ContainerLayout title="Borders" centralBorder="full">
			<Grey />
		</ContainerLayout>
	);
};
BordersStory.story = { name: 'with all borders' };

export const LeftContentStory = () => {
	return (
		<ContainerLayout
			title="Borders"
			centralBorder="full"
			leftContent={<Grey heightInPixels={200} />}
		>
			<Grey />
		</ContainerLayout>
	);
};
LeftContentStory.story = {
	name: 'with an element passed into the left column',
};

export const BackgroundStory = () => {
	return (
		<ContainerLayout
			title="Background Colour"
			description="About this content"
			fontColour={brandBackground.ctaPrimary}
			centralBorder="full"
			backgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
		>
			<Grey />
		</ContainerLayout>
	);
};
BackgroundStory.story = { name: 'with a blue background' };

export const InnerBackgroundStory = () => {
	return (
		<ContainerLayout
			title="Inner Background"
			description="About this content"
			fontColour={brandBackground.ctaPrimary}
			centralBorder="full"
			innerBackgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
		>
			<Grey />
		</ContainerLayout>
	);
};
InnerBackgroundStory.story = {
	name: 'with a blue inner background',
};

export const DifferentBackgrounds = () => {
	return (
		<ContainerLayout
			title="Tip us off"
			centralBorder="full"
			backgroundColour="#FFF280"
			borderColour={brandBorder.primary}
			innerBackgroundColour="#FFE501"
		>
			<h1>
				👀 Share stories with the Guardian securely and confidentially
			</h1>
		</ContainerLayout>
	);
};
DifferentBackgrounds.story = {
	name: 'with inner background different to main background',
};

export const StretchRightStory = () => {
	return (
		<ContainerLayout
			title="Stretched Right"
			description="About this content"
			centralBorder="full"
			stretchRight={true}
		>
			<Grey />
		</ContainerLayout>
	);
};
StretchRightStory.story = {
	name: 'with content stretched to the right (no margin)',
};

export const PartialStory = () => {
	return (
		<ContainerLayout
			title="Borders"
			showTopBorder={false}
			centralBorder="partial"
		>
			<Grey />
		</ContainerLayout>
	);
};
PartialStory.story = { name: 'with a partial border divider' };

export const SidesStory = () => {
	return (
		<ContainerLayout
			title="NoSides"
			showTopBorder={false}
			centralBorder="full"
			padSides={false}
			padContent={false}
		>
			<Grey />
		</ContainerLayout>
	);
};
SidesStory.story = { name: 'with a full border divider' };

export const ToggleableStory = () => {
	return (
		<ContainerLayout
			title="Toggleable Container"
			toggleable={true}
			sectionId="sectionId"
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</ContainerLayout>
	);
};
ToggleableStory.story = { name: 'toggleable container' };

export const MarginsStory = () => {
	return (
		<>
			<ContainerLayout
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</ContainerLayout>
		</>
	);
};
MarginsStory.story = { name: 'with no vertical margins' };

export const MultipleStory = () => {
	return (
		<>
			<ContainerLayout title="Page Title" showTopBorder={false} />
			<ContainerLayout title="Headlines" centralBorder="partial">
				<Grey />
			</ContainerLayout>
			<ContainerLayout title="Useful links" centralBorder="partial" />
			<ContainerLayout
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				centralBorder="partial"
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={brandAltBackground.primary}
			>
				<h2>Insert call to action here</h2>
			</ContainerLayout>
			<ContainerLayout
				title="Videos"
				fontColour="white"
				showTopBorder={false}
				backgroundColour="black"
				showSideBorders={false}
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				centralBorder="partial"
			>
				<Grey />
			</ContainerLayout>
		</>
	);
};
MultipleStory.story = {
	name: 'with multiple sections',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const TreatsStory = () => {
	return (
		<ContainerLayout
			title="Treats"
			treats={[
				{
					text: 'The treat text',
					linkTo: '',
				},
				{
					text: 'Another piece of text',
					linkTo: '',
				},
			]}
			showTopBorder={false}
			showSideBorders={false}
		>
			<Grey />
		</ContainerLayout>
	);
};
TreatsStory.story = {
	name: 'with treats',
};
