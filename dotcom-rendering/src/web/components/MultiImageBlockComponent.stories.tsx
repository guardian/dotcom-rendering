import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { MultiImageBlockComponent } from './MultiImageBlockComponent';
import { fourImages } from './MultiImageBlockComponent.mocks';
import { Section } from './Section';

const oneImage = fourImages.slice(0, 1);
const twoImages = fourImages.slice(0, 2);
const threeImages = fourImages.slice(0, 3);

export default {
	component: MultiImageBlockComponent,
	title: 'Components/MultiImageBlockComponent',
	chromatic: { diffThreshold: 0.7 },
};

export const SingleImage = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={oneImage}
			/>
		</Section>
	);
};
SingleImage.story = {
	name: 'single image',
};

export const SingleImageWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={oneImage}
				caption="This is the caption for a single image"
			/>
		</Section>
	);
};
SingleImageWithCaption.story = {
	name: 'single image with caption',
};

export const SideBySide = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={twoImages}
			/>
		</Section>
	);
};
SideBySide.story = {
	name: 'side by side',
};

export const SideBySideWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={twoImages}
				caption="This is the caption for side by side"
			/>
		</Section>
	);
};
SideBySideWithCaption.story = {
	name: 'side by side with caption',
};

export const OneAboveTwo = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={threeImages}
			/>
		</Section>
	);
};
OneAboveTwo.story = {
	name: 'one above two',
};

export const OneAboveTwoWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={threeImages}
				caption="This is the caption for one above two"
			/>
		</Section>
	);
};
OneAboveTwoWithCaption.story = {
	name: 'one above two with caption',
};

export const GridOfFour = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={fourImages}
			/>
		</Section>
	);
};
GridOfFour.story = {
	name: 'grid of four',
};

export const GridOfFourWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={fourImages}
				caption="This is the caption for grid of four"
			/>
		</Section>
	);
};
GridOfFourWithCaption.story = {
	name: 'grid of four with caption',
};
