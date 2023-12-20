import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { useEffect } from 'react';
import { render } from 'react-dom';
import type { ImageForLightbox } from '../types/content';
import { LightboxImages } from './LightboxImages';
import { LightboxLayout } from './LightboxLayout';

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

function showLightbox(lightbox: HTMLElement) {
	lightbox.removeAttribute('hidden');
}

function showInfo(lightbox: HTMLElement) {
	lightbox.classList.remove('hide-info');
}

function hideInfo(lightbox: HTMLElement) {
	lightbox.classList.add('hide-info');
}

const Initialise = ({
	children,
	shouldShowInfo = true,
	format,
	images,
}: {
	children: React.ReactNode;
	shouldShowInfo?: boolean;
	format: ArticleFormat;
	images: ImageForLightbox[];
}) => {
	useEffect(() => {
		const lightbox =
			document.querySelector<HTMLDialogElement>('#gu-lightbox');
		if (!lightbox) return;
		showLightbox(lightbox);
		if (shouldShowInfo) {
			showInfo(lightbox);
		} else {
			hideInfo(lightbox);
		}
		const imageRoot = document.querySelector('ul#lightbox-images');
		if (!imageRoot) return;
		const loaded = new Set(
			Array.from({ length: images.length }, (_, index) => index + 1),
		);
		render(
			<LightboxImages format={format} images={images} loaded={loaded} />,
			imageRoot,
		);
	}, [format, images, shouldShowInfo]);

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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise shouldShowInfo={false} format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
		</Initialise>
	);
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
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
		<Initialise format={format} images={images}>
			<LightboxLayout imageCount={images.length} />
		</Initialise>
	);
};

/**
 * with html in caption (links)
 * with a portrait image
 *
 */
