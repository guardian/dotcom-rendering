import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { Branding as BrandingType } from '../types/branding';
import { Branding } from './Branding.importable';

const meta: Meta<typeof Branding> = {
	component: Branding,
	title: 'Components/Branding',
};

export default meta;
type Story = StoryObj<typeof Branding>;

const defaultFormat: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
};

// const guardianOrgBranding: BrandingType = {
// 	brandingType: { name: 'sponsored' },
// 	sponsorName: 'theguardian.org',
// 	logo: {
// 		src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/57ba1d00-b2bd-4f6d-ba35-15a82b8d9507-0094b90a-bdb8-4e97-b866-dcf49179b29d-theguardian.org.png',
// 		link: 'https://theguardian.org/',
// 		label: 'Supported by',
// 		dimensions: { width: 280, height: 180 },
// 	},
// 	aboutThisLink:
// 		'https://www.theguardian.com/environment/2023/jan/06/about-animals-farmed-investigating-modern-farming-around-the-world',
// 	logoForDarkBackground: {
// 		src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/58a1e08d-cd4a-47a5-966a-4846b0461642-46629471-cb0b-4c59-9a06-1ef23778b41f-theguardian.org2.png',
// 		link: 'https://theguardian.org/',
// 		label: 'Supported by',
// 		dimensions: { width: 280, height: 180 },
// 	},
// };

const humanityBranding: BrandingType = {
	sponsorName: 'Humanity United',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/14/May/2018/533d381b-ac99-4e10-83be-8b64a1da9710-hu.png',
		dimensions: { width: 140, height: 90 },
		link: 'http://www.humanityunited.org/ ',
		label: 'Supported by',
	},
	logoForDarkBackground: {
		src: 'https://static.theguardian.com/commercial/sponsor/14/May/2018/4192d462-d794-4f07-a43c-6b546f4dcd93-hu-white.png',
		dimensions: { width: 140, height: 39 },
		link: 'http://www.humanityunited.org/ ',
		label: 'Supported by',
	},
	aboutThisLink:
		'https://www.theguardian.com/info/2016/jan/25/content-funding',
};

export const defaultStory: Story = () => {
	return <Branding branding={humanityBranding} format={defaultFormat} />;
};
defaultStory.storyName = 'Default';
defaultStory.decorators = [splitTheme([defaultFormat])];
