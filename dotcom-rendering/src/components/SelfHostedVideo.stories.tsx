import { css } from '@emotion/react';
import { breakpoints, textSans17Object } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import {
	selfHostedLoopVideo169Card as loop169Card,
	selfHostedLoopVideo45Card as loop45Card,
	selfHostedLoopVideo53Card as loop53Card,
	selfHostedLoopVideo54Card as loop54Card,
	selfHostedLoopVideo916Card as loop916Card,
} from '../../fixtures/manual/trails';
import { SelfHostedVideo } from './SelfHostedVideo.island';

const meta = {
	component: SelfHostedVideo,
	title: 'Components/SelfHostedVideo',
	decorators: [centreColumnDecorator],
	render: (args) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				marginTop: '20px',
			}}
		>
			<p style={{ ...textSans17Object }}>
				Note: If the video is not playing, you may need to visit
				https://storybook.thegulocal.com/ instead of localhost, as CORS
				is enabled for self-hosted video.
			</p>
			<SelfHostedVideo {...args} />
		</div>
	),
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.wide],
			disableSnapshot: true,
		},
	},
} satisfies Meta<typeof SelfHostedVideo>;

export default meta;
type Story = StoryObj<typeof SelfHostedVideo>;

export const Loop: Story = {
	args: {
		sources: loop54Card.mainMedia.sources,
		aspectRatio: loop54Card.mainMedia.aspectRatio,
		uniqueId: 'test-video-1',
		videoStyle: 'Loop',
		posterImage:
			'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
		fallbackImage: '',
	},
} satisfies Story;

export const Cinemagraph: Story = {
	args: {
		...Loop.args,
		videoStyle: 'Cinemagraph',
	},
} satisfies Story;

export const Default: Story = {
	name: 'Default (aka non-Youtube)',
	args: {
		...Loop.args,
		videoStyle: 'Default',
	},
} satisfies Story;

export const WithoutProgressBar: Story = {
	args: {
		...Loop.args,
		hideProgressBar: false,
	},
} satisfies Story;

export const WithControlsAtTop: Story = {
	args: {
		...Loop.args,
		controlsPosition: 'top',
	},
} satisfies Story;

export const WithM3U8File = {
	name: 'With M3U8 file',
	args: {
		...Loop.args,
		sources: [
			{
				src: 'https://uploads.guimcode.co.uk/2025/09/01/Loop__Japan_fireball--ace3fcf6-1378-41db-9d21-f3fc07072ab2-1.10.m3u8',
				mimeType: 'application/x-mpegURL',
				width: 900,
				height: 720,
			},
			{
				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
				mimeType: 'video/mp4',
				width: 900,
				height: 720,
			},
		],
	},
} satisfies Story;

const videos = [
	{
		video: loop54Card,
		aspectRatio: '5:4',
	},
	{
		video: loop45Card,
		aspectRatio: '4:5',
	},
	{
		video: loop53Card,
		aspectRatio: '5:3',
	},
	{
		video: loop916Card,
		aspectRatio: '9:16',
	},
	{
		video: loop169Card,
		aspectRatio: '16:9',
	},
] as const;

export const WithDifferentAspectRatios = {
	name: 'With different aspect ratios',
	render: (args) => (
		<>
			{videos.map(({ video: { mainMedia }, aspectRatio }) => (
				<div key={mainMedia.atomId}>
					<div style={{ marginBottom: '40px' }}>
						<p style={{ ...textSans17Object }}>
							Aspect Ratio: {aspectRatio}
						</p>
						<SelfHostedVideo
							{...args}
							{...Loop.args}
							sources={mainMedia.sources}
							aspectRatio={mainMedia.aspectRatio}
						/>
					</div>
				</div>
			))}
		</>
	),
} satisfies Story;

export const WithDifferentAspectRatiosAnd54Container = {
	name: 'With different aspect ratios in a 5:4 container',
	render: (args) => (
		<>
			{videos.map(({ video: { mainMedia }, aspectRatio }) => (
				<div key={mainMedia.atomId}>
					<div style={{ marginBottom: '40px' }}>
						<p style={{ ...textSans17Object }}>
							Aspect Ratio: {aspectRatio}
						</p>
						<SelfHostedVideo
							{...args}
							{...Loop.args}
							sources={mainMedia.sources}
							aspectRatio={mainMedia.aspectRatio}
							containerAspectRatioDesktop={5 / 4}
						/>
					</div>
				</div>
			))}
		</>
	),
} satisfies Story;

export const PausePlay: Story = {
	...Loop,
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
	...Loop,
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
	...Loop,
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

export const FullscreenOpen: Story = {
	...Loop,
	name: 'Open fullscreen',
	args: {
		...Loop.args,
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

		await canvas.findByTestId('fullscreen-icon');

		await userEvent.click(canvas.getByTestId('fullscreen-icon'));

		await expect(requestFullscreenSpy).toHaveBeenCalled();
	},
} satisfies Story;

export const TestingInputTypeRange: Story = {
	...Loop,
	name: 'hello',
	render: () => (
		<div
			css={css`
				margin: 20px;
			`}
		>
			<input
				css={css`
					-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
					width: 100%; /* Specific width is required for Firefox. */
					background: transparent; /* Otherwise white in Chrome */

					::-webkit-slider-thumb {
						-webkit-appearance: none;
					}

					:focus {
						outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
					}

					::-ms-track {
						width: 100%;
						cursor: pointer;

						/* Hides the slider so custom styles can be added */
						background: transparent;
						border-color: transparent;
						color: transparent;
					}

					::-webkit-slider-thumb {
						-webkit-appearance: none;
						height: 14px;
						width: 14px;
						border-radius: 50%;
						border: 1px solid black;
						cursor: pointer;
						margin-top: -5px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
						background-color: red;
					}

					::-moz-range-thumb {
						height: 14px;
						width: 14px;
						border-radius: 50%;
						border: 1px solid black;
						cursor: pointer;
						background-color: red;
					}

					::-ms-thumb {
						height: 14px;
						width: 14px;
						border-radius: 50%;
						border: 1px solid black;
						cursor: pointer;
						background-color: red;
					}

					::-webkit-slider-runnable-track {
						cursor: pointer;
						width: 100%;
						height: 5px;
						background-color: blue;
						border-radius: 5px;
					}

					:focus::-webkit-slider-runnable-track {
						background: green;
					}

					::-moz-range-track {
						cursor: pointer;
						width: 100%;
						height: 5px;
						background-color: blue;
						border-radius: 5px;
					}

					::-ms-track {
						width: 100%;
						height: 8.4px;
						cursor: pointer;
						background: transparent;
						border-color: transparent;
						border-width: 16px 0;
						color: transparent;
					}
				`}
				type="range"
				min={0}
				max={100}
				step={0.1}
			/>
		</div>
	),
};
