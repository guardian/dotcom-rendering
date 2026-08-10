import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { ProgressNumber as ProgressNumberComponent } from './ProgressNumber';

const meta = preview.meta({
	title: 'Components/Election Trackers/Progress Number',
	component: ProgressNumberComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const ProgressNumber = meta.story({
	args: {
		progress: 300,
		total: 650,
		copy: 'seats declared',
		additionalCopy: 'Additional context',
	},
});
