import { css } from '@emotion/react';

import { breakpoints } from '@guardian/src-foundations/mq';
import {
	brandAltBackground,
	brandBackground,
	brandBorder,
} from '@guardian/src-foundations/palette';

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
	return <ContainerLayout title="No Children" />;
};
PageTitleStory.story = { name: 'with no children' };

export const ContainerStory = () => {
	return (
		<ContainerLayout title="Default Container">
			<Grey />
		</ContainerLayout>
	);
};
ContainerStory.story = { name: 'default container' };

export const NoTitleStory = () => {
	return (
		<ContainerLayout>
			<Grey />
		</ContainerLayout>
	);
};
NoTitleStory.story = { name: 'with no title' };

export const BordersStory = () => {
	return (
		<ContainerLayout
			title="Borders"
			showTopBorder={true}
			sideBorders={true}
			centralBorder="full"
		>
			<Grey />
		</ContainerLayout>
	);
};
BordersStory.story = { name: 'with all borders' };

export const LeftContentStory = () => {
	return (
		<ContainerLayout
			title="Borders"
			showTopBorder={true}
			sideBorders={true}
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
			showTopBorder={true}
			sideBorders={true}
			centralBorder="full"
			backgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
		>
			<Grey />
		</ContainerLayout>
	);
};
BackgroundStory.story = { name: 'with a blue background' };

export const StretchRightStory = () => {
	return (
		<ContainerLayout
			title="Stretched Right"
			description="About this content"
			showTopBorder={true}
			sideBorders={true}
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
			sideBorders={true}
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
			sideBorders={true}
			centralBorder="full"
			padSides={false}
			padContent={false}
		>
			<Grey />
		</ContainerLayout>
	);
};
SidesStory.story = { name: 'with a full border divider' };

export const MarginsStory = () => {
	return (
		<>
			<ContainerLayout
				title="No Vertical Margins"
				sideBorders={true}
				showTopBorder={true}
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="No Vertical Margins"
				sideBorders={true}
				showTopBorder={true}
				centralBorder="full"
				verticalMargins={false}
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="No Vertical Margins"
				sideBorders={true}
				showTopBorder={true}
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
			<ContainerLayout
				title="Page Title"
				showTopBorder={false}
				sideBorders={true}
			/>
			<ContainerLayout
				title="Headlines"
				showTopBorder={true}
				sideBorders={true}
				centralBorder="partial"
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="Useful links"
				showTopBorder={true}
				sideBorders={true}
				centralBorder="partial"
			/>
			<ContainerLayout
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				showTopBorder={true}
				sideBorders={true}
				centralBorder="partial"
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				showTopBorder={false}
				sideBorders={false}
				backgroundColour={brandAltBackground.primary}
			>
				<h2>Insert call to action here</h2>
			</ContainerLayout>
			<ContainerLayout
				title="Videos"
				fontColour="white"
				showTopBorder={false}
				backgroundColour="black"
			>
				<Grey />
			</ContainerLayout>
			<ContainerLayout
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				showTopBorder={true}
				sideBorders={true}
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
