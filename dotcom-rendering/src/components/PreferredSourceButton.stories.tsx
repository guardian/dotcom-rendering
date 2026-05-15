import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { PreferredSourceButton } from './PreferredSourceButton';

const meta = preview.meta({
	component: PreferredSourceButton,
	decorators: [leftColumnDecorator],
});

export const Default = meta.story({
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});
