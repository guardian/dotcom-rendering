import type { Meta, StoryObj } from '@storybook/react';
import { defaultFormats } from '../../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../../.storybook/modes';
import { AudioAtom as AudioAtomComponent } from './AudioAtom';

const meta = {
	title: 'Components/Audio Atom',
	component: AudioAtomComponent,
} satisfies Meta<typeof AudioAtomComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AudioAtom = {
	args: {
		id: 'd6d509cf-ca10-407f-8913-e16a3712f415',
		trackUrl:
			'https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3',
		kicker: 'Football Weekly Extra Extra',
		title: 'Q&A and Detective Wilson',
		duration: 849,
	},
	parameters: {
		// We only want to snapshot the `multipleFormats` version below.
		chromatic: { disable: true },
	},
} satisfies Story;

export const MultipleFormats = {
	args: AudioAtom.args,
	parameters: {
		formats: defaultFormats,
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Story;
