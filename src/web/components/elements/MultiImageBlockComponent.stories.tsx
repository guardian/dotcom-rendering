import { Design, Display, Pillar } from '@guardian/types';
import { ContainerLayout } from '@root/src/web/components/ContainerLayout';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { MultiImageBlockComponent } from './MultiImageBlockComponent';
import { fourImages } from './MultiImageBlockComponent.mocks';

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
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={oneImage}
			/>
		</ContainerLayout>
	);
};
SingleImage.story = {
	name: 'single image',
};

export const SingleImageWithCaption = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={oneImage}
				caption="This is the caption for a single image"
			/>
		</ContainerLayout>
	);
};
SingleImageWithCaption.story = {
	name: 'single image with caption',
};

export const SideBySide = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={twoImages}
			/>
		</ContainerLayout>
	);
};
SideBySide.story = {
	name: 'side by side',
};

export const SideBySideWithCaption = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={twoImages}
				caption="This is the caption for side by side"
			/>
		</ContainerLayout>
	);
};
SideBySideWithCaption.story = {
	name: 'side by side with caption',
};

export const OneAboveTwo = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={threeImages}
			/>
		</ContainerLayout>
	);
};
OneAboveTwo.story = {
	name: 'one above two',
};

export const OneAboveTwoWithCaption = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={threeImages}
				caption="This is the caption for one above two"
			/>
		</ContainerLayout>
	);
};
OneAboveTwoWithCaption.story = {
	name: 'one above two with caption',
};

export const GridOfFour = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={fourImages}
			/>
		</ContainerLayout>
	);
};
GridOfFour.story = {
	name: 'grid of four',
};

export const GridOfFourWithCaption = () => {
	return (
		<ContainerLayout>
			<MultiImageBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				images={fourImages}
				caption="This is the caption for grid of four"
			/>
		</ContainerLayout>
	);
};
GridOfFourWithCaption.story = {
	name: 'grid of four with caption',
};
