import type { DCRSlideshowImage } from '../types/front';
import { Slideshow } from './Slideshow';

export default {
	component: Slideshow,
	title: 'Components/Slideshow',
};

const images = [
	{
		imageSrc:
			'https://media.guim.co.uk/d9ede9177cd8a01c7a7e87da54fb15e0615adf20/0_1597_6000_3599/master/6000.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/69a5b094811888463d7887484571cbfcea3143fc/0_97_5827_3902/master/5827.jpg',
		imageCaption: 'Cat Royale',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/fe310d0ab79125e2f55680b02b9347e45832e1f0/0_0_4800_3536/master/4800.jpg',
		imageCaption: 'Cat Royale',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/4199670a084d3179778332af3ee6297486332e91/0_0_4000_3000/master/4000.jpg',
	},
] as const satisfies readonly DCRSlideshowImage[];

export const WithOneImage = () => (
	<Slideshow images={images.slice(0, 1)} imageSize="large"></Slideshow>
);
export const WithTwoImages = () => (
	<Slideshow images={images.slice(0, 2)} imageSize="large"></Slideshow>
);
export const WithFiveImages = () => (
	<Slideshow images={images.slice(0, 10)} imageSize="large"></Slideshow>
);
