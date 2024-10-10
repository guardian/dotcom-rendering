// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import CaptionIcon, { CaptionIconVariant } from '.';

// ----- Stories ----- //

const Image = () => (
	<CaptionIcon
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		variant={CaptionIconVariant.Image}
	></CaptionIcon>
);

const Video = () => (
	<CaptionIcon
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
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
