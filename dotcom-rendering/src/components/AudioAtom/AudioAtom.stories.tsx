import { AudioAtom as AudioAtomComponent } from './AudioAtom';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';

const meta: Meta<typeof AudioAtomComponent> = {
	title: 'Components/Audio Atom',
	component: AudioAtomComponent,
};

type Story = StoryObj<typeof AudioAtomComponent>;

export const AudioAtom: Story = {
	args: {
		id: 'd6d509cf-ca10-407f-8913-e16a3712f415',
		trackUrl:
			'https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3',
		kicker: 'Football Weekly Extra Extra',
		title: 'Q&A and Detective Wilson',
		duration: 849,
	},
	decorators: [splitTheme()],
};

export default meta;
