import { textEgyptian17Object } from '@guardian/source/foundations';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { SideBySide as SideBySideComponent } from './SideBySide';

const meta = preview.meta({
	title: 'Components/Election Trackers/Side By Side',
	component: SideBySideComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
				'vertical tablet': allModes['vertical tablet'],
			},
		},
	},
});

export const SideBySide = meta.story({
	args: {
		from: 'tablet',
		left: {
			heading: 'Senate',
			children: (
				<p css={textEgyptian17Object}>
					Some components on the left from the "tablet" breakpoint.
				</p>
			),
		},
		right: {
			heading: 'House',
			children: (
				<p css={textEgyptian17Object}>
					Some components on the right from the "tablet" breakpoint.
				</p>
			),
		},
	},
});
