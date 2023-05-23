import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import { LI } from './Card/components/LI';
import { LabsSection } from './LabsSection';

export default {
	component: LabsSection,
	title: 'Components/LabsSection',
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
	<LI padSides={true}>
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
	</LI>
);

const LeftColPlaceholder = ({
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

export const ContainerStory = () => {
	return (
		<LabsSection title="Default Container" showTopBorder={false}>
			<Placeholder />
		</LabsSection>
	);
};
ContainerStory.storyName = 'default container';

export const NoTitleStory = () => {
	return (
		<LabsSection showTopBorder={false}>
			<Placeholder />
		</LabsSection>
	);
};
NoTitleStory.storyName = 'with no title';

export const TopBorderStory = () => {
	return (
		<LabsSection title="Borders">
			<Placeholder />
		</LabsSection>
	);
};
TopBorderStory.storyName = 'with all borders';

export const LeftContentStory = () => {
	return (
		<LabsSection
			title="LeftContent"
			leftContent={
				<LeftColPlaceholder text="LeftCol" heightInPixels={200} />
			}
		>
			<Placeholder />
		</LabsSection>
	);
};
LeftContentStory.storyName = 'with an element passed into the left column';

export const ToggleableStory = () => {
	return (
		<LabsSection
			title="Toggleable Container"
			toggleable={true}
			sectionId="section-id"
			showTopBorder={false}
		>
			<Placeholder />
		</LabsSection>
	);
};
ToggleableStory.storyName = 'toggleable container';

export const MultipleStory = () => {
	return (
		<>
			<LabsSection title="Page Title" showTopBorder={false} />
			<LabsSection title="Headlines">
				<Placeholder />
			</LabsSection>
			<LabsSection title="Useful links" />
			<LabsSection
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
			>
				<Placeholder />
			</LabsSection>
			<LabsSection showTopBorder={false}>
				<h2>Insert call to action here</h2>
			</LabsSection>
			<LabsSection title="Videos" showTopBorder={false}>
				<Placeholder />
			</LabsSection>
			<LabsSection
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
			>
				<Placeholder />
			</LabsSection>
		</>
	);
};
MultipleStory.storyName = 'with multiple FrontGrids';
MultipleStory.story = {
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
		<LabsSection
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
			showDateHeader={true}
			editionId="UK"
		>
			<Placeholder />
		</LabsSection>
	);
};
TreatsStory.storyName = 'with treats and date header';
