import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { LI } from './Card/components/LI';
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
		<FrontSection
			title="Default Container"
			showTopBorder={false}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</FrontSection>
	);
};
ContainerStory.storyName = 'default container';

export const NoTitleStory = () => {
	return (
		<FrontSection showTopBorder={false} discussionApiUrl={discussionApiUrl}>
			<Placeholder />
		</FrontSection>
	);
};
NoTitleStory.storyName = 'with no title';

export const TopBorderStory = () => {
	return (
		<FrontSection title="Borders" discussionApiUrl={discussionApiUrl}>
			<Placeholder />
		</FrontSection>
	);
};
TopBorderStory.storyName = 'with all borders';

export const LeftContentStory = () => {
	return (
		<FrontSection
			title="LeftContent"
			leftContent={
				<LeftColPlaceholder text="LeftCol" heightInPixels={100} />
			}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</FrontSection>
	);
};
LeftContentStory.storyName = 'with an element passed into the left column';

export const LeftContentOpinionStory = () => {
	return (
		<FrontSection
			title="Opinion"
			leftContent={
				<LeftColPlaceholder text="LeftCol" heightInPixels={100} />
			}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</FrontSection>
	);
};
LeftContentOpinionStory.storyName =
	'with an element passed into the left column of opinion section';

export const ToggleableStory = () => {
	return (
		<FrontSection
			title="Toggleable Container"
			toggleable={true}
			sectionId="section-id"
			showTopBorder={false}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</FrontSection>
	);
};
ToggleableStory.storyName = 'toggleable container';

export const MultipleStory = () => {
	return (
		<>
			<FrontSection
				title="Page Title"
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
			/>
			<FrontSection title="Headlines" discussionApiUrl={discussionApiUrl}>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Useful links"
				discussionApiUrl={discussionApiUrl}
			/>
			<FrontSection
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
			>
				<h2>Insert call to action here</h2>
			</FrontSection>
			<FrontSection
				title="Videos"
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</FrontSection>
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
			showDateHeader={true}
			editionId="UK"
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</FrontSection>
	);
};
TreatsStory.storyName = 'with treats and date header';

/**
 * Note only the first container should show a badge
 */
export const MultipleOnAPaidFront = () => {
	// const frontBranding = {
	// 	edition: {
	// 		id: 'UK',
	// 	},
	// 	branding: {
	// 		brandingType: {
	// 			name: 'paid-content',
	// 		},
	// 		sponsorName: 'Grounded',
	// 		logo: {
	// 			src: 'https://static.theguardian.com/commercial/sponsor/28/Oct/2020/daa941da-14fd-46cc-85cb-731ce59050ee-Grounded_badging-280x180.png',
	// 			dimensions: {
	// 				width: 140,
	// 				height: 90,
	// 			},
	// 			link: '/',
	// 			label: 'Paid for by',
	// 		},
	// 		aboutThisLink:
	// 			'https://www.theguardian.com/info/2016/jan/25/content-funding',
	// 	},
	// } as const;

	return (
		<>
			<FrontSection
				title="Section one"
				discussionApiUrl={discussionApiUrl}
				// TODO - Addd some branding
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Section two"
				discussionApiUrl={discussionApiUrl}
				// TODO - Addd some branding
			>
				<Placeholder />
			</FrontSection>
		</>
	);
};
MultipleOnAPaidFront.storyName = 'two sections on a paid front';

export const PageSkinStory = () => {
	return (
		<FrontSection
			title="Page Skin"
			hasPageSkin={true}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder text="Page skins constrain my layout to desktop" />
		</FrontSection>
	);
};

PageSkinStory.storyName = 'with page skin';
PageSkinStory.story = {
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};
