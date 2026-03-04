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

export const Loop5to4: Story = {
	name: 'Looping video in 5:4 aspect ratio',
	args: {
		sources: [
			{
				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
				mimeType: 'video/mp4',
			},
		],
		uniqueId: 'test-video-1',
		atomId: 'test-atom-1',
		videoStyle: 'Loop',
		height: 720,
		width: 900,
		posterImage:
			'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
		fallbackImage: '',
	},
} satisfies Story;

export const WithM3U8File = {
	name: 'With M3U8 file',
	args: {
		...Loop5to4.args,
		sources: [
			{
				src: 'https://uploads.guimcode.co.uk/2025/09/01/Loop__Japan_fireball--ace3fcf6-1378-41db-9d21-f3fc07072ab2-1.10.m3u8',
				mimeType: 'application/x-mpegURL',
			},
			{
				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
				mimeType: 'video/mp4',
			},
		],
	},
} satisfies Story;

export const Loop16to9 = {
	name: 'Looping video in 16:9 aspect ratio',
	args: {
		...Loop5to4.args,
		sources: [
			{
				src: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
				mimeType: 'video/mp4',
			},
		],
		height: 1080,
		width: 1920,
	},
} satisfies Story;

export const WithCinemagraph = {
	args: {
		...Loop5to4.args,
		videoStyle: 'Cinemagraph',
	},
} satisfies Story;

export const PausePlay: Story = {
	...Loop5to4,
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
} satisfies Story;

export const UnmuteMute: Story = {
	...Loop5to4,
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
} satisfies Story;

// Function to emulate pausing between interactions
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const InteractionObserver: Story = {
	...Loop5to4,
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
} satisfies Story;

export const FullscreenButtonOpen: Story = {
	...Loop5to4,
	name: 'Open fullscreen with button',
	args: {
		...Loop5to4.args,
		videoStyle: 'Default',
	},
	parameters: {
		test: {
			// The following error is received without this flag: "TypeError: ophan.trackClickComponentEvent is not a function"
			dangerouslyIgnoreUnhandledErrors: true,
		},
	},
	play: async ({ canvasElement }) => {
		/**
		 * Ideally, this interaction test would open and close fullscreen.
		 * However, the Fullscreen API is not implemented in jsdom, so
		 * document.fullscreenElement will always be null regardless of what the
		 * component does. Instead, we spy on requestFullscreen to ensure
		 * that the correct handler is invoked when the fullscreen button is clicked.
		 */

		const canvas = within(canvasElement);

		const requestFullscreenSpy = spyOn(
			HTMLElement.prototype,
			'requestFullscreen',
		);

		const fullscreenIcon = await canvas.findByTestId('fullscreen-icon');

		await userEvent.click(fullscreenIcon);

		await expect(requestFullscreenSpy).toHaveBeenCalled();
	},
} satisfies Story;

export const FullscreenDoubleClickOpen: Story = {
	...Loop5to4,
	name: 'Open fullscreen with a double click',
	args: {
		...Loop5to4.args,
		videoStyle: 'Default',
	},
	parameters: {
		test: {
			// The following error is received without this flag: "TypeError: ophan.trackClickComponentEvent is not a function"
			dangerouslyIgnoreUnhandledErrors: true,
		},
	},
	play: async ({ canvasElement }) => {
		/**
		 * Ideally, this interaction test would open and close fullscreen.
		 * However, the Fullscreen API is not implemented in jsdom, so
		 * document.fullscreenElement will always be null regardless of what the
		 * component does. Instead, we spy on requestFullscreen to ensure
		 * that the correct handler is invoked when the fullscreen button is clicked.
		 */

		const canvas = within(canvasElement);

		const requestFullscreenSpy = spyOn(
			HTMLElement.prototype,
			'requestFullscreen',
		);

		const selfHostedPlayer = await canvas.findByTestId(
			'self-hosted-video-player',
		);

		await userEvent.dblClick(selfHostedPlayer);

		await expect(requestFullscreenSpy).toHaveBeenCalled();
	},
} satisfies Story;
