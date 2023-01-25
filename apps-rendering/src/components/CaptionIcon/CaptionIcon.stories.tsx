// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import CaptionIcon, { CaptionIconVariant } from '.';

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
	></CaptionIcon>
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
	></CaptionIcon>
);

// ----- Exports ----- //

export default {
	component: CaptionIcon,
	title: 'AR/CaptionIcon',
};

export { Image, Video };
