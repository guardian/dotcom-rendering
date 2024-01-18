import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
	storage,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { userEvent, within } from '@storybook/testing-library';
import { useEffect } from 'react';
import type { ImageForLightbox } from '../types/content';
import { LightboxLayout } from './LightboxLayout.importable';

const testImage: ImageForLightbox = {
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

export default {
	component: LightboxLayout,
	title: 'Components/LightboxLayout',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.desktop],
		},
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

const Initialise = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const lightbox =
			document.querySelector<HTMLDialogElement>('#gu-lightbox');
		lightbox?.removeAttribute('hidden');
	}, []);

	return <div style={{ height: '100vh' }}>{children}</div>;
};

export const Default = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [{ ...testImage }];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithTitle = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [{ ...testImage, title: 'Title' }];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithCredit = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [{ ...testImage, displayCredit: true }];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithRating = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [{ ...testImage, starRating: 3 }];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WhenLiveBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: Pillar.News,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
			firstPublished: 1643816168535,
			blockId: 'mockId',
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithEverything = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithoutCaption = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};
	const images = [{ ...testImage }];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};
/**
 * We manually click the [i] button to close the caption
 */
WithoutCaption.play = async ({
	canvasElement,
}: {
	canvasElement: HTMLElement;
}) => {
	const canvas = within(canvasElement);
	storage.local.clear();
	await userEvent.click(canvas.getByTitle('Toggle caption [i]'));
	storage.local.clear();
};

export const WithSport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Sport,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithCulture = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Culture,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithLifestyle = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Lifestyle,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithOpinion = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Opinion,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithSpecialReport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReport,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithSpecialReportAlt = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReportAlt,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

export const WithLabs = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.Labs,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise>
			<LightboxLayout format={format} images={images} />
		</Initialise>
	);
};

/**
 * with html in caption (links)
 * with a portrait image
 *
 */
