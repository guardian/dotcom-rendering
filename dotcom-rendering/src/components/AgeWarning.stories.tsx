import preview from '../../.storybook/preview';
import { AgeWarning } from './AgeWarning';

const meta = preview.meta({
	title: 'Components/Age Warning',
	component: AgeWarning,
});

export const Default = meta.story({
	args: {
		age: '10 years old',
	},
});

export const WithSizeSetToSmall = meta.story({
	args: {
		age: '5 months old',
		size: 'small',
	},
});

export const ScreenReaderVersion = meta.story({
	args: {
		age: '20 million years old',
		isScreenReader: true,
	},
	name: 'With Screen Reader True (invisible)',
});

export const WithOldTextMissingFromInput = meta.story({
	args: {
		age: '5 years',
	},
});
