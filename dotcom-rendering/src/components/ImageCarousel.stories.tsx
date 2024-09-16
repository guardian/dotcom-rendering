import { css } from '@emotion/react';
import { breakpoints, space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import type { DCRSlideshowImage } from '../types/front';
import { ImageCarousel } from './ImageCarousel';

const meta = {
	component: ImageCarousel,
	title: 'Components/ImageCarousel',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.leftCol,
			],
		},
	},
} satisfies Meta<typeof ImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const images = [
	{
		imageSrc:
			'https://media.guim.co.uk/4199670a084d3179778332af3ee6297486332e91/0_0_4000_3000/master/4000.jpg',
		imageCaption: 'First image',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/fe27aabf35683caa6b89f2781ee5d0ad9042e209/0_0_4800_3197/master/4800.jpg',
		imageCaption: 'Another image',
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

const Wrapper = ({ children }: { children: ReactNode }) => {
	const styles = css`
		margin: ${space[3]}px;
		max-width: 480px;
	`;
	return <div css={styles}>{children}</div>;
};

export const Default = {
	render: (args) => (
		<Wrapper>
			<ImageCarousel {...args} />
		</Wrapper>
	),
	args: {
		images,
		imageSize: 'medium',
	},
} satisfies Story;
