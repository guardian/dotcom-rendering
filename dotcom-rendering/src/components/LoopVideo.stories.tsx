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
		fallbackImage: (
			<CardPicture
				mainImage="https://i.guim.co.uk/img/media/13dd7e5c4ca32a53cd22dfd90ac1845ef5e5d643/91_0_1800_1080/master/1800.jpg?width=465&dpr=1&s=none&crop=5%3A4"
				imageSize="large"
				loading="eager"
			/>
		),
	},
} satisfies StoryObj<typeof LoopVideo>;

export const WithoutAudio = {
	name: 'Without Audio',
	args: {
		...Default.args,
		hasAudio: false,
	},
} satisfies StoryObj<typeof LoopVideo>;
