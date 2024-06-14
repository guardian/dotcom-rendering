// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '../../../vendor/@guardian/types/index';
import { image } from 'fixtures/image';
import Img from '.';

// ----- Setup ----- //

const sizes = { mediaQueries: [], default: '40vw' };

// ----- Stories ----- //

const Default = () => (
	<Img
		image={image}
		sizes={sizes}
		className={none}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		lightbox={none}
	/>
);

const Placeholder = () => (
	<Img
		image={{
			...image,
			src: '',
			srcset: '',
			dpr2Srcset: '',
		}}
		sizes={sizes}
		className={none}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		lightbox={none}
	/>
);

// ----- Exports ----- //

export default {
	component: Img,
	title: 'AR/ImgAlt',
	parameters: {
		chromatic: { diffThreshold: 0.25 },
	},
};

export { Default, Placeholder };
