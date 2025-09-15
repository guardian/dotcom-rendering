import { css } from '@emotion/react';
import { breakpoints, space, textSans17 } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { palette } from '../palette';
import type { DCRContainerPalette, DCRSlideshowImage } from '../types/front';
import { ContainerOverrides } from './ContainerOverrides';
import { SlideshowCarousel } from './SlideshowCarousel.importable';

const images = [
	{
		imageSrc:
			'https://media.guim.co.uk/7cffd9d6809318a9d92c719c473d193caf95d601/0_0_3110_2074/3110.jpg',
		imageCaption:
			'Land Rover parked somewhere on the Roseland Heritage Coast, Cornwall.',
	},
	{
		imageSrc:
			'https://media.guim.co.uk/c36af9ca4c805e161ec991df550277db32637f32/0_0_3110_2074/3110.jpg',
		imageCaption:
			'Kudhva, architectural hideouts on the north Cornish coast',
	},
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

const Wrapper = ({
	children,
	heading,
}: {
	children: ReactNode;
	heading?: string;
}) => {
	const sectionStyles = css`
		padding: ${space[4]}px;
		background: ${palette('--card-background')};
	`;
	const containerStyles = css`
		max-width: 460px;
	`;
	const headingStyles = css`
		${textSans17};
		color: ${palette('--card-headline')};
		margin-bottom: ${space[2]}px;
	`;
	return (
		<section css={sectionStyles}>
			<div css={containerStyles}>
				{!!heading && <h2 css={headingStyles}>{heading}</h2>}
				{children}
			</div>
		</section>
	);
};

const meta = {
	component: SlideshowCarousel,
	title: 'Components/SlideshowCarousel',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.leftCol,
			],
		},
	},
	args: {
		images,
		imageSize: 'medium',
		hasNavigationBackgroundColour: false,
	},
	render: (args) => (
		<Wrapper>
			<SlideshowCarousel {...args} />
		</Wrapper>
	),
} satisfies Meta<typeof SlideshowCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithMultipleImages = {} satisfies Story;

export const WithThreeImages = {
	args: {
		images: images.slice(0, 3),
	},
} satisfies Story;

export const WithOneImage = {
	args: {
		images: images.slice(0, 1),
	},
} satisfies Story;

const containerPalettes = [
	'InvestigationPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'EventPalette',
	'EventAltPalette',
	'LongRunningAltPalette',
	'SombreAltPalette',
	'SpecialReportAltPalette',
	'Branded',
] as const satisfies readonly DCRContainerPalette[];

export const WithSpecialPaletteVariations = {
	parameters: {
		/** We only want one breakpoint snapshotted for special palette variations */
		chromatic: { viewports: [breakpoints.desktop] },
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<ContainerOverrides
					containerPalette={containerPalette}
					key={containerPalette}
				>
					<Wrapper heading={containerPalette}>
						<SlideshowCarousel {...args} />
					</Wrapper>
				</ContainerOverrides>
			))}
		</>
	),
} satisfies Story;
