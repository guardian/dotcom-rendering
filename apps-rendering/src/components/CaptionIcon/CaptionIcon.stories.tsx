// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import CaptionIcon, { CaptionIconVariant } from '.';

// ----- Stories ----- //

const Image = () => (
	<CaptionIcon
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		variant={CaptionIconVariant.Image}
	></CaptionIcon>
);

const Video = () => (
	<CaptionIcon
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		variant={CaptionIconVariant.Video}
	></CaptionIcon>
);

// ----- Exports ----- //

export default {
	component: CaptionIcon,
	title: 'AR/CaptionIcon',
};

export { Image, Video };
