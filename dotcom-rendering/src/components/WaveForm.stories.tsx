import { palette } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { WaveForm as WaveFormComponent } from './WaveForm';

const meta = preview.meta({
	title: 'Components/WaveForm',
	component: WaveFormComponent,
});

export const Default = meta.story({
	args: {
		seed: 'https://audio.guim.co.uk/2024/10/18-57753-USEE_181024.mp3',
		height: 100,
		bars: 175,
	},
});

export const InProgress = meta.story({
	args: {
		...Default.input.args,
		progress: 40,
		buffer: 50,
	},
});

export const ShorterWithMoreBars = meta.story({
	args: {
		...InProgress.input.args,
		height: 50,
		bars: 200,
		barWidth: 2,
	},
});

export const WithTheme = meta.story({
	args: {
		...InProgress.input.args,
		theme: {
			progress: palette.neutral[73],
			buffer: palette.neutral[60],
			wave: palette.neutral[46],
		},
	},
});
