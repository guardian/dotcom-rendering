// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import { CaptionIconVariant } from 'components/CaptionIcon';
import { Optional } from 'optional';
import type { ReactElement } from 'react';
import FigCaption from '.';

// ----- Stories ----- //

const Image = (): ReactElement => (
	<FigCaption
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		variant={CaptionIconVariant.Image}
	>
		{Optional.some(
			'Age of the train … a tourist train in Switzerland. Photograph: Kisa_Markiza/Getty Images',
		)}
	</FigCaption>
);

const Video = (): ReactElement => (
	<FigCaption
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		variant={CaptionIconVariant.Video}
	>
		{Optional.some(
			'Age of the train … a tourist train in Switzerland. Photograph: Kisa_Markiza/Getty Images',
		)}
	</FigCaption>
);

// ----- Exports ----- //

export default {
	component: FigCaption,
	title: 'AR/FigCaption',
};

export { Image, Video };
