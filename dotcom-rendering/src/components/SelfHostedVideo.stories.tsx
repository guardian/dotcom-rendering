import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { SelfHostedVideo } from './SelfHostedVideo.importable';

const meta = {
	component: SelfHostedVideo,
	title: 'Components/SelfHostedVideo',
	decorators: [centreColumnDecorator],
	render: (args) => <SelfHostedVideo {...args} />,
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.wide],
			disableSnapshot: true,
		},
	},
} satisfies Meta<typeof SelfHostedVideo>;

export default meta;
type Story = StoryObj<typeof SelfHostedVideo>;

export const Loop4to5: Story = {
	name: 'Looping video in 4:5 aspect ratio',
	args: {
		sources: [
			{
				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
				mimeType: 'video/mp4',
			},
		],
		uniqueId: 'test-video-1',
		atomId: 'test-atom-1',
		height: 720,
		width: 900,
		posterImage:
			'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
		fallbackImage: '',
	},
};

// export const WithM3U8File: Story = {
// 	name: 'With M3U8 file',
// 	args: {
// 		...Default.args,
// 		sources: [
// 			{
// 				src: 'https://uploads.guimcode.co.uk/2025/09/01/Loop__Japan_fireball--ace3fcf6-1378-41db-9d21-f3fc07072ab2-1.10.m3u8',
// 				mimeType: 'application/x-mpegURL',
// 			},
// 			{
// 				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
// 				mimeType: 'video/mp4',
// 			},
// 		],
// 	},
// };

export const Loop16to9: Story = {
	name: 'Looping video in 16:9 aspect ratio',
	args: {
		...Loop4to5.args,
		sources: [
			{
				src: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
				mimeType: 'video/mp4',
			},
		],
		height: 1080,
		width: 1920,
	},
};

export const PausePlay: Story = {
	...Loop4to5,
	name: 'Pause and play interaction',
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const videoEl = canvas.getByTestId('self-hosted-video-player');

		await userEvent.click(videoEl, {
			delay: 300, // Allow video to start playing.
		});
		await canvas.findByTestId('play-icon');

		const progressBar = await canvas.findByRole('progressbar');
		await expect(Number(progressBar.ariaValueNow)).toBeGreaterThan(0);

		// Play Video
		await userEvent.click(videoEl);
		await expect(canvas.queryByTestId('play-icon')).not.toBeInTheDocument();
	},
};

export const UnmuteMute: Story = {
	...Loop4to5,
	name: 'Unmute and mute interaction',
	parameters: {
		test: {
			// The following error is received without this flag: "TypeError: ophan.trackClickComponentEvent is not a function"
			dangerouslyIgnoreUnhandledErrors: true,
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await canvas.findByTestId('unmute-icon');

		await userEvent.click(canvas.getByTestId('unmute-icon'));
		await canvas.findByTestId('mute-icon');

		await userEvent.click(canvas.getByTestId('mute-icon'));
		await canvas.findByTestId('unmute-icon');
	},
};

// Function to emulate pausing between interactions
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const InteractionObserver: Story = {
	...Loop4to5,
	name: 'Interaction observer',
	render: (args) => (
		<div data-testid="test-container">
			<SelfHostedVideo {...args} />
			<div style={{ height: '100vh' }}></div>
			<p data-testid="page-end">End of page</p>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await sleep(500); // Allow enough time for the autoplay video to start.
		canvas.getByTestId('page-end').scrollIntoView();

		const progressBar = await canvas.findByRole('progressbar');
		const progress = Number(progressBar.ariaValueNow);

		await sleep(500); // Allow enough time to be confident that the video is paused.
		await expect(Number(progressBar.ariaValueNow)).toEqual(progress);
		await expect(canvas.queryByTestId('play-icon')).not.toBeInTheDocument();
	},
};
