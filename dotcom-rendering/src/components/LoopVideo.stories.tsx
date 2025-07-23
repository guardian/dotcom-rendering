import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { LoopVideo } from './LoopVideo.importable';

const meta = {
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

export default meta;
type Story = StoryObj<typeof LoopVideo>;

export const Default: Story = {
	name: 'Default',
	args: {
		src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
		uniqueId: 'test-video-1',
		atomId: 'test-atom-1',
		height: 720,
		width: 900,
		image: 'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
		fallbackImage: '',
	},
};

export const Without5to4Ratio: Story = {
	name: 'Without 5:4 aspect ratio',
	args: {
		...Default.args,
		src: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
		height: 1080,
		width: 1920,
	},
};

export const PausePlay: Story = {
	...Default,
	name: 'Pause and play interaction',
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const videoEl = canvas.getByTestId('loop-video');

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
	...Default,
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
	...Default,
	name: 'Interaction observer',
	render: (args) => (
		<div data-testid="test-container">
			<LoopVideo {...args} />
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
