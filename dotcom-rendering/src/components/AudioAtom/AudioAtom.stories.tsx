import { defaultFormats } from '../../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { AudioAtom as AudioAtomComponent } from './AudioAtom';

const meta = preview.meta({
	title: 'Components/Audio Atom',
	component: AudioAtomComponent,
});

export const AudioAtom = meta.story({
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
});

export const MultipleFormats = meta.story({
	args: AudioAtom.input.args,
	parameters: {
		formats: defaultFormats,
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
});
