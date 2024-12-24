import type { Meta, StoryObj } from '@storybook/react';
import { defaultFormats } from '../../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../../.storybook/modes';
import { AudioPlayer as Player } from './AudioPlayer';
// import audioFile from './stories/default_audio_test.mp3';

const meta = {
	title: 'Components/Audio Player',
	component: Player,
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AudioPlayer = {
	args: {
		// src: audioFile,
		src: 'https://audio.guim.co.uk/2024/10/18-57753-USEE_181024.mp3',
		mediaId: 'mediaId',
	},
} satisfies Story;

export const MultipleFormats = {
	args: AudioPlayer.args,
	parameters: {
		formats: defaultFormats,
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Story;
