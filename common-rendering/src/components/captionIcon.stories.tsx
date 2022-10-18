/* eslint-disable import/no-default-export -- exclude stories for this rule */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
import type { FC } from 'react';
import CaptionIcon, { CaptionIconVariant } from './captionIcon';

// ----- Stories ----- //

const Image: FC = () => (
	<CaptionIcon
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
	</CaptionIcon>
);

const Video: FC = () => (
	<CaptionIcon
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
	</CaptionIcon>
);

// ----- Exports ----- //

export default {
	component: CaptionIcon,
	title: 'Common/Components/CaptionIcon',
};

export { Image, Video };
