import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { CardPicture } from './CardPicture';
import { LoopVideo } from './LoopVideo.importable';

export default {
	component: LoopVideo,
	title: 'Components/LoopVideo',
	decorators: [centreColumnDecorator],
	render: (args) => <LoopVideo {...args} />,
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.wide],
		},
	},
} satisfies Meta<typeof LoopVideo>;

export const Default = {
	name: 'Default',
	args: {
		src: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
		videoId: 'test-video-1',
		height: 337.5,
		width: 600,
		thumbnailImage:
			'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
		fallbackImageComponent: (
			<CardPicture
				mainImage="https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg"
				imageSize="large"
				loading="eager"
			/>
		),
	},
} satisfies StoryObj<typeof LoopVideo>;

export const WithWebmFile = {
	name: 'With Webm File',
	args: {
		...Default.args,
		src: 'https://interactive.guim.co.uk/atoms/2023/01/2025-trump-100-days/assets/v/1746020259/videos/header-video.webm',
	},
} satisfies StoryObj<typeof LoopVideo>;

export const WithoutAudio = {
	name: 'Without Audio',
	args: {
		...Default.args,
		hasAudio: false,
	},
} satisfies StoryObj<typeof LoopVideo>;
