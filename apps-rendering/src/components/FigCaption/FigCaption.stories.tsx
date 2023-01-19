// ----- Imports ----- //

import { CaptionIconVariant } from 'components/CaptionIcon';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
import type { FC, ReactElement } from 'react';
import FigCaption from '.';

// ----- Stories ----- //

const Image: FC = (): ReactElement => (
	<FigCaption
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		supportsDarkMode={true}
		variant={CaptionIconVariant.Image}
	>
		{some(
			'Age of the train … a tourist train in Switzerland. Photograph: Kisa_Markiza/Getty Images',
		)}
	</FigCaption>
);

const Video: FC = (): ReactElement => (
	<FigCaption
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		supportsDarkMode={true}
		variant={CaptionIconVariant.Video}
	>
		{some(
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
