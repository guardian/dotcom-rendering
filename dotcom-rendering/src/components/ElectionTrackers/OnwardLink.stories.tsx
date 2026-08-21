import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { OnwardLink as OnwardLinkComponent } from './OnwardLink';

const meta = preview.meta({
	title: 'Components/Election Trackers/Onward Link',
	component: OnwardLinkComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const OnwardLink = meta.story({
	args: {
		link: new URL('https://www.theguardian.com'),
		text: 'Full results',
	},
});
