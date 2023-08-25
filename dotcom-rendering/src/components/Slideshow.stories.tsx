import { css } from '@emotion/react';
import { breakpoints, space } from '@guardian/source-foundations';
import type { PropsWithChildren } from 'react';
import type { DCRSlideshowImage } from '../types/front';
import { Slideshow } from './Slideshow';

export default {
	component: Slideshow,
	title: 'Components/Slideshow',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.leftCol,
			],
		},
	},
};

const one = [
	{
		imageSrc:
			'https://media.guim.co.uk/d9ede9177cd8a01c7a7e87da54fb15e0615adf20/0_1597_6000_3599/master/6000.jpg',
	},
] as const satisfies readonly DCRSlideshowImage[];

const two = [
	{
		imageSrc:
			'https://media.guim.co.uk/69a5b094811888463d7887484571cbfcea3143fc/0_97_5827_3902/master/5827.jpg',
		imageCaption: 'Cat Royale',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/fe310d0ab79125e2f55680b02b9347e45832e1f0/0_0_4800_3536/master/4800.jpg',
		imageCaption: 'Dog Splash',
	},
] as const satisfies readonly DCRSlideshowImage[];

const six = [
	{
		imageSrc:
			'https://media.guim.co.uk/4199670a084d3179778332af3ee6297486332e91/0_0_4000_3000/master/4000.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/fe27aabf35683caa6b89f2781ee5d0ad9042e209/0_0_4800_3197/master/4800.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/326773ef9d4e78e14be0cb6f6123bfec773ddf03/0_229_5500_3300/5500.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/2b14981ddc59bce686c07fe356eb09cae48fde87/0_76_5832_3499/5832.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/cc9dc53d0eff3b047c6d045fa49cb48846a860b3/0_36_2048_1500/2048.jpg',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/ed66e9dc6a84de6bc0afe1965833f0fa4047c22d/0_324_3500_2100/3500.jpg',
	},
] as const satisfies readonly DCRSlideshowImage[];

const wrapper = css`
	margin: ${space[3]}px;
	aspect-ratio: 5 / 3;
	contain: layout;
`;

const Wrapper = ({
	children,
	maxWidth,
}: PropsWithChildren<{ maxWidth: number }>) => (
	<div
		css={[
			wrapper,
			css`
				max-width: ${maxWidth}px;
			`,
		]}
	>
		{children}
	</div>
);

/** this one makes no sense, but it’s technically possible so let’s capture it */
export const WithoutAnyImage = () => (
	<Wrapper maxWidth={480}>
		<Slideshow images={[]} imageSize="medium" />
	</Wrapper>
);

/** this one makes no sense, but it’s technically possible so let’s capture it */
export const WithOneImage = () => (
	<Wrapper maxWidth={640}>
		<Slideshow images={one} imageSize="large" />
	</Wrapper>
);

export const WithTwoDynamo = () => (
	<Wrapper maxWidth={640}>
		<Slideshow images={two} imageSize="jumbo" isDynamo={true} />
	</Wrapper>
);

export const WithTwoImages = () => (
	<Wrapper maxWidth={320}>
		<Slideshow images={two} imageSize="small" />
	</Wrapper>
);

export const WithFiveImages = () => (
	<Wrapper maxWidth={480}>
		<Slideshow images={six} imageSize="medium" />
	</Wrapper>
);

export const Fast = () => (
	<Wrapper maxWidth={480}>
		<Slideshow images={six} imageSize="jumbo" fade={0.25} display={1} />
	</Wrapper>
);
