import { defaultFormats } from '../../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { AudioPlayer as Player } from './AudioPlayer';
// import audioFile from './stories/default_audio_test.mp3';

const meta = preview.meta({
	title: 'Components/Audio Player',
	component: Player,
});

export const AudioPlayer = meta.story({
	args: {
		// src: audioFile,
		src: 'https://audio.guim.co.uk/2024/10/18-57753-USEE_181024.mp3',
		mediaId: 'mediaId',
	},
	parameters: {
		// We only want to snapshot the `multipleFormats` version below.
		chromatic: { disable: true },
	},
});

export const MultipleFormats = meta.story({
	args: AudioPlayer.input.args,
	parameters: {
		formats: defaultFormats,
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
});
