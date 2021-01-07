import React from 'react';

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
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={oneImage}
		/>
	);
};
SingleImage.story = {
	name: 'single image',
};

export const SingleImageWithCaption = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={oneImage}
			caption="This is the caption for a single image"
		/>
	);
};
SingleImageWithCaption.story = {
	name: 'single image with caption',
};

export const SideBySide = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={twoImages}
		/>
	);
};
SideBySide.story = {
	name: 'side by side',
};

export const SideBySideWithCaption = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={twoImages}
			caption="This is the caption for side by side"
		/>
	);
};
SideBySideWithCaption.story = {
	name: 'side by side with caption',
};

export const OneAboveTwo = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={threeImages}
		/>
	);
};
OneAboveTwo.story = {
	name: 'one above two',
};

export const OneAboveTwoWithCaption = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={threeImages}
			caption="This is the caption for one above two"
		/>
	);
};
OneAboveTwoWithCaption.story = {
	name: 'one above two with caption',
};

export const GridOfFour = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={fourImages}
		/>
	);
};
GridOfFour.story = {
	name: 'grid of four',
};

export const GridOfFourWithCaption = () => {
	return (
		<MultiImageBlockComponent
			design="Article"
			pillar="news"
			images={fourImages}
			caption="This is the caption for grid of four"
		/>
	);
};
GridOfFourWithCaption.story = {
	name: 'grid of four with caption',
};
