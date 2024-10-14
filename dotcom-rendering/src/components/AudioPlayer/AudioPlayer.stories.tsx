import type { Meta, StoryObj } from '@storybook/react';
import { defaultFormats } from '../../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../../.storybook/modes';
import { AudioPlayer as Player } from './AudioPlayer';
import { audioBlob } from './stories/audio-blob';

const meta = {
	title: 'Components/Audio Player',
	component: Player,
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AudioPlayer = {
	args: {
		src: audioBlob,
		// src: 'https://audio.guim.co.uk/2024/09/23-66750-gnl.sci.20240923.eb.blue_zone_new.mp3',
	},
	parameters: {
		// We only want to snapshot the `multipleFormats` version below.
		chromatic: { disable: true },
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
