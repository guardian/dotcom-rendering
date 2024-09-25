import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { LI } from './Card/components/LI';
import { FrontSection } from './FrontSection';

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

const PageSkinWrapper = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			background-image: url('https://adimage.theguardian.com/pageskins/puppies-pageskin.jpg');
			background-size: contain;
		`}
	>
		{children}
	</div>
);

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
	args: {
		title: 'Default Container',
		showTopBorder: false,
		discussionApiUrl,
		editionId: 'UK',
		children: <Placeholder />,
	},
	render: (args) => <FrontSection {...args}>{args.children}</FrontSection>,
} satisfies Meta<typeof FrontSection>;

export const ContainerStory = {
	name: 'default container',
};

export const NoTitleStory = {
	name: 'with no title',
	args: { title: undefined },
};

export const TopBorderStory = {
	name: 'with all borders',
	args: { title: 'Borders' },
};

export const LeftContentStory = {
	name: 'with an element passed into the left column',
	args: {
		title: 'LeftContent',
		leftContent: <LeftColPlaceholder text="LeftCol" heightInPixels={100} />,
	},
};

export const LeftContentOpinionStory = {
	name: 'with an element passed into the left column of opinion section',
	args: {
		title: 'Opinion',
		leftContent: <LeftColPlaceholder text="LeftCol" heightInPixels={100} />,
	},
};

export const ToggleableStory = {
	name: 'toggleable container',
	args: {
		title: 'Toggleable Container',
		toggleable: true,
		sectionId: 'section-id',
	},
};

export const MultipleStory = {
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
	render: () => (
		<>
			<FrontSection
				title="Page Title"
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			/>
			<FrontSection
				title="Headlines"
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Useful links"
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			/>
			<FrontSection
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<h2>Insert call to action here</h2>
			</FrontSection>
			<FrontSection
				title="Videos"
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<Placeholder />
			</FrontSection>
		</>
	),
};

export const TreatsStory = {
	name: 'with treats and date header',
	args: {
		title: 'Treats and Date Header',
		showTopBorder: false,
		showDateHeader: true,
		treats: [
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
		],
	},
};

/**
 * Use the same logo for each of the stories with branding except stories for Advertising partner and Exclusive advertising partner labels
 */
const logo = {
	src: 'https://static.theguardian.com/commercial/sponsor/28/Oct/2020/daa941da-14fd-46cc-85cb-731ce59050ee-Grounded_badging-280x180.png',
	dimensions: {
		width: 140,
		height: 90,
	},
	link: '/',
	label: 'Paid for by',
};

const logoForAdvertisingPartner = {
	src: 'https://static.theguardian.com/commercial/sponsor/28/Oct/2020/daa941da-14fd-46cc-85cb-731ce59050ee-Grounded_badging-280x180.png',
	dimensions: {
		width: 140,
		height: 90,
	},
	link: '/',
	label: 'Advertising partner',
};

export const WithSponsoredBranding = {
	name: 'with sponsored branding',
	args: {
		title: 'Section',
		collectionBranding: {
			kind: 'sponsored',
			isFrontBranding: false,
			branding: {
				brandingType: {
					name: 'sponsored',
				},
				sponsorName: 'guardian.org',
				logo,
				aboutThisLink:
					'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
			},
			isContainerBranding: true,
			hasMultipleBranding: false,
		},
	},
};

export const WithSponsoredBrandingAdvertisingPartner = {
	name: 'with sponsored branding for Advertising partner',
	args: {
		title: 'Section',
		collectionBranding: {
			kind: 'sponsored',
			isFrontBranding: true,
			branding: {
				brandingType: {
					name: 'sponsored',
				},
				sponsorName: 'guardian.org',
				logo: logoForAdvertisingPartner,
				aboutThisLink:
					'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		},
	},
};

export const WithSponsoredBrandingAdvertisingPartnerTagPages = {
	name: 'with sponsored branding for Advertising partner TagPages',
	args: {
		title: 'Section',
		isTagPage: true,
		collectionBranding: {
			kind: 'sponsored',
			isFrontBranding: true,
			branding: {
				brandingType: {
					name: 'sponsored',
				},
				sponsorName: 'guardian.org',
				logo: logoForAdvertisingPartner,
				aboutThisLink:
					'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		},
	},
};

export const WithPaidBranding = {
	name: 'with paid content branding',
	args: {
		title: '',
		collectionBranding: {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: {
					name: 'paid-content',
				},
				sponsorName: 'guardian.org',
				logo,
				aboutThisLink:
					'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
			},
			isContainerBranding: true,
			hasMultipleBranding: false,
		},
	},
};

export const WithPaidContentForWholeFront = {
	name: 'with paid content for whole front',
	args: {
		title: 'First Section',
		collectionBranding: {
			kind: 'paid-content',
			isFrontBranding: true,
			branding: {
				brandingType: {
					name: 'paid-content',
				},
				sponsorName: 'guardian.org',
				logo,
				aboutThisLink:
					'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		},
	},
};

export const PageSkinStory = {
	name: 'with page skin',
	args: {
		title: 'Page Skin',
		hasPageSkin: true,
		children: (
			<Placeholder text="Page skins constrain my layout to desktop" />
		),
	},
	render: (args) => (
		<PageSkinWrapper>
			<FrontSection {...args}>{args.children}</FrontSection>
		</PageSkinWrapper>
	),
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
} satisfies StoryObj<typeof FrontSection>;
