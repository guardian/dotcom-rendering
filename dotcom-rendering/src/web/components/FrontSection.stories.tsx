import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	breakpoints,
	neutral,
} from '@guardian/source-foundations';
import { FrontSection } from './FrontSection';

export default {
	component: FrontSection,
	title: 'Components/FrontSection',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

const Placeholder = ({
	heightInPixels = 400,
	text = 'Placeholder Content',
}: {
	heightInPixels?: number;
	text?: string;
}) => (
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
		{text}
	</div>
);

/** The stories below consistently have padContent set to false, even though the default value and the one which ends up rendering the component in the application is true.
 * This is so the stories below can match up with the section stories which the FrontSection component is modeled after. */

export const ContainerStory = () => {
	return (
		<FrontSection
			title="Default Container"
			showTopBorder={false}
			showSideBorders={false}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
ContainerStory.story = { name: 'default container' };

export const NoTitleStory = () => {
	return (
		<FrontSection
			showTopBorder={false}
			showSideBorders={false}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
NoTitleStory.story = { name: 'with no title' };

export const BordersStory = () => {
	return (
		<FrontSection title="Borders" centralBorder="full" padContent={false}>
			<Placeholder />
		</FrontSection>
	);
};
BordersStory.story = { name: 'with all borders' };

export const LeftContentStory = () => {
	return (
		<FrontSection
			title="Borders"
			centralBorder="full"
			padContent={false}
			leftContent={<Placeholder text="LeftCol" heightInPixels={200} />}
		>
			<Placeholder />
		</FrontSection>
	);
};
LeftContentStory.story = {
	name: 'with an element passed into the left column',
};

export const BackgroundStory = () => {
	return (
		<FrontSection
			title="Background Colour"
			description="About this content"
			fontColour={neutral[100]}
			centralBorder="full"
			backgroundColour={brand[400]}
			borderColour={brand[600]}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
BackgroundStory.story = { name: 'with a blue background' };

export const InnerBackgroundStory = () => {
	return (
		<FrontSection
			title="Inner Background"
			description="About this content"
			fontColour={neutral[100]}
			centralBorder="full"
			innerBackgroundColour={brand[400]}
			borderColour={brand[300]}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
InnerBackgroundStory.story = {
	name: 'with a blue inner background',
};

export const DifferentBackgrounds = () => {
	return (
		<FrontSection
			title="Tip us off"
			centralBorder="full"
			backgroundColour="#FFF280"
			borderColour={brand[300]}
			innerBackgroundColour="#FFE501"
			padContent={false}
		>
			<h1>
				👀 Share stories with the Guardian securely and confidentially
			</h1>
		</FrontSection>
	);
};
DifferentBackgrounds.story = {
	name: 'with inner background different to main background',
};

export const StretchRightStory = () => {
	return (
		<FrontSection
			title="Stretched Right"
			description="About this content"
			centralBorder="full"
			stretchRight={true}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
StretchRightStory.story = {
	name: 'with content stretched to the right (no margin)',
};

export const PartialStory = () => {
	return (
		<FrontSection
			title="Borders"
			showTopBorder={false}
			centralBorder="partial"
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
PartialStory.story = { name: 'with a partial border divider' };

export const SidesStory = () => {
	return (
		<FrontSection
			title="NoSides"
			showTopBorder={false}
			centralBorder="full"
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
SidesStory.story = { name: 'with a full border divider' };

export const ToggleableStory = () => {
	return (
		<FrontSection
			title="Toggleable Container"
			toggleable={true}
			sectionId="section-id"
			showTopBorder={false}
			showSideBorders={false}
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
ToggleableStory.story = { name: 'toggleable container' };

export const MarginsStory = () => {
	return (
		<>
			<FrontSection
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="No Vertical Margins"
				centralBorder="full"
				verticalMargins={false}
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
		</>
	);
};
MarginsStory.story = { name: 'with no vertical margins' };

export const MultipleStory = () => {
	return (
		<>
			<FrontSection
				title="Page Title"
				showTopBorder={false}
				padContent={false}
			/>
			<FrontSection
				title="Headlines"
				centralBorder="partial"
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection title="Useful links" centralBorder="partial" />
			<FrontSection
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				centralBorder="partial"
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={brandAlt[400]}
				padContent={false}
			>
				<h2>Insert call to action here</h2>
			</FrontSection>
			<FrontSection
				title="Videos"
				fontColour="white"
				showTopBorder={false}
				backgroundColour="black"
				showSideBorders={false}
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				centralBorder="partial"
				padContent={false}
			>
				<Placeholder />
			</FrontSection>
		</>
	);
};
MultipleStory.story = {
	name: 'with multiple FrontGrids',
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
		<FrontSection
			title="Treats and Date Header"
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
			showDateHeader={true}
			editionId="UK"
			padContent={false}
		>
			<Placeholder />
		</FrontSection>
	);
};
TreatsStory.story = {
	name: 'with treats and date header',
};
