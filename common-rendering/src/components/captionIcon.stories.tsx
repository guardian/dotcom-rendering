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
	title: 'Common/Components/CaptionIcon',
};

export { Image, Video };
