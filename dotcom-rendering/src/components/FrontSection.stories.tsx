import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ReactNode } from 'react';
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
		editionId: 'UK',
		children: <Placeholder />,
		url: '/',
	},
	render: (args) => <FrontSection {...args} />,
} satisfies Meta<typeof FrontSection>;

export const Default = {
	args: { title: 'Default Container', showTopBorder: false },
};

export const PrimaryContainer = {
	args: {
		title: 'Primary Container',
		containerLevel: 'Primary',
	},
};
export const SecondaryContainer = {
	args: {
		title: 'Secondary Container',
		containerLevel: 'Secondary',
	},
};

export const NoTopBorder = {
	args: { showTopBorder: false },
};

export const WithLeftContent = {
	args: {
		title: 'LeftContent',
		leftContent: <LeftColPlaceholder text="LeftCol" heightInPixels={100} />,
	},
};

export const Toggleable = {
	args: {
		title: 'Toggleable Container',
		toggleable: true,
		showTopBorder: false,
		sectionId: 'section-id',
	},
};

export const MultipleSections = {
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
				editionId="UK"
			/>
			<FrontSection title="Headlines" editionId="UK">
				<Placeholder />
			</FrontSection>
			<FrontSection title="Useful links" editionId="UK" />
			<FrontSection
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
				editionId="UK"
			>
				<Placeholder />
			</FrontSection>
			<FrontSection editionId="UK">
				<h2>Insert call to action here</h2>
			</FrontSection>
			<FrontSection title="Videos" editionId="UK">
				<Placeholder />
			</FrontSection>
			<FrontSection
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
				editionId="UK"
			>
				<Placeholder />
			</FrontSection>
		</>
	),
};

export const WithTreatsAndDateHeader = {
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

export const WithPaidContentBranding = {
	args: {
		title: 'Section',
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

export const GuardianLabs = {
	args: {
		title: 'Section',
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
		isLabs: true,
	},
};

export const WithPageSkin = {
	args: {
		title: 'Page Skin',
		hasPageSkin: true,
		children: (
			<Placeholder text="Page skins constrain my layout to desktop" />
		),
	},
	render: (args) => (
		<PageSkinWrapper>
			<FrontSection {...args} />
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
