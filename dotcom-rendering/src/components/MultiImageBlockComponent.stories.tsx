import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
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
					theme: Pillar.News,
				}}
				images={oneImage}
			/>
		</Section>
	);
};
SingleImage.storyName = 'single image';

export const SingleImageWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={oneImage}
				caption="This is the caption for a single image"
			/>
		</Section>
	);
};
SingleImageWithCaption.storyName = 'single image with caption';

export const SideBySide = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={twoImages}
			/>
		</Section>
	);
};
SideBySide.storyName = 'side by side';

export const SideBySideWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={twoImages}
				caption="This is the caption for side by side"
			/>
		</Section>
	);
};
SideBySideWithCaption.storyName = 'side by side with caption';

export const OneAboveTwo = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={threeImages}
			/>
		</Section>
	);
};
OneAboveTwo.storyName = 'one above two';

export const OneAboveTwoWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={threeImages}
				caption="This is the caption for one above two"
			/>
		</Section>
	);
};
OneAboveTwoWithCaption.storyName = 'one above two with caption';

export const GridOfFour = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={fourImages}
			/>
		</Section>
	);
};
GridOfFour.storyName = 'grid of four';

export const GridOfFourWithCaption = () => {
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<MultiImageBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				images={fourImages}
				caption="This is the caption for grid of four"
			/>
		</Section>
	);
};
GridOfFourWithCaption.storyName = 'grid of four with caption';
