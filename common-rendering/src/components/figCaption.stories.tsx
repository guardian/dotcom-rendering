/* eslint-disable import/no-default-export -- exclude stories for this rule */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
import type { FC } from 'react';
import { CaptionIconVariant } from './captionIcon';
import FigCaption from './figCaption';

// ----- Stories ----- //

const Image: FC = () => (
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

const Video: FC = () => (
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
	title: 'Common/Components/FigCaption',
};

export { Image, Video };
