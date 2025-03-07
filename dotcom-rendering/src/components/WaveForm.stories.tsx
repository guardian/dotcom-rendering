import { palette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { WaveForm as WaveFormComponent } from './WaveForm';

const meta = {
	title: 'Components/WaveForm',
	component: WaveFormComponent,
} satisfies Meta<typeof WaveFormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		seed: 'https://audio.guim.co.uk/2024/10/18-57753-USEE_181024.mp3',
		height: 100,
		bars: 175,
	},
} satisfies Story;

export const InProgress = {
	args: {
		...Default.args,
		progress: 40,
		buffer: 50,
	},
} satisfies Story;

export const ShorterWithMoreBars = {
	args: {
		...InProgress.args,
		height: 50,
		bars: 200,
		barWidth: 2,
	},
} satisfies Story;

export const WithTheme = {
	args: {
		...InProgress.args,
		theme: {
			progress: palette.neutral[73],
			buffer: palette.neutral[60],
			wave: palette.neutral[46],
		},
	},
} satisfies Story;
