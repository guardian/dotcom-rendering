import { storage } from '@guardian/libs';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/format';
import type { ImageForLightbox } from '../types/content';
import { LightboxLayout } from './LightboxLayout.importable';

const Initialise = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const lightbox =
			document.querySelector<HTMLDialogElement>('#gu-lightbox');
		lightbox?.removeAttribute('hidden');
		storage.local.clear();
	}, []);

	return <div style={{ height: '100vh' }}>{children}</div>;
};

const meta = {
	title: 'Components/LightboxLayout',
	component: LightboxLayout,
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.desktop],
		},
		viewport: {
			disable: true,
		},
	},
	decorators: (Story) => (
		<Initialise>
			<Story />
		</Initialise>
	),
} satisfies Meta<typeof LightboxLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const testImage: ImageForLightbox = {
	position: 1,
	elementId: 'mockId',
	width: 1200,
	height: 800,
	alt: '26 March – Residents in Manchester, England, taking part in the Clap For Our Carers campaign, people across the UK applauding NHS workers from the doorsteps, balconies or windows of their homes, in order to say thank you for all of their hard work dealing with the Covid-19 coronavirus pandemic.',
	caption:
		'26 March – Residents in Manchester, England, taking part in the Clap For Our Carers campaign, people across the UK applauding NHS workers from the doorsteps, balconies or windows of their homes, in order to say thank you for all of their hard work dealing with the Covid-19 coronavirus pandemic',
	credit: 'Photograph: Christopher Thomond/The Guardian',
	masterUrl:
		'https://media.guim.co.uk/56b42eef576bc04c820da710459acd91082bb37b/0_0_6720_4480/6720.jpg',
	displayCredit: false,
};

export const Default = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		images: [{ ...testImage }],
	},
} satisfies Story;

export const WithTitle = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		images: [{ ...testImage, title: 'Title' }],
	},
} satisfies Story;

export const WithCredit = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		images: [{ ...testImage, displayCredit: true }],
	},
} satisfies Story;

export const WithRating = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		images: [{ ...testImage, starRating: 3 }],
	},
} satisfies Story;

export const WhenLiveBlog = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
				firstPublished: 1643816168535,
				blockId: 'mockId',
			},
		],
	},
} satisfies Story;

export const WithEverything = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithSport = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithCulture = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Culture,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithLifestyle = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithOpinion = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithSpecialReport = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithSpecialReportAlt = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;

export const WithLabs = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		images: [
			{
				...testImage,
				starRating: 3,
				title: 'Title',
				displayCredit: true,
			},
		],
	},
} satisfies Story;
