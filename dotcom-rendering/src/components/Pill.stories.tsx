import { SvgCamera } from '@guardian/source/react-components';
import preview from '../../.storybook/preview';
import { Pill } from './Pill';
import { SvgMediaControlsPlay } from './SvgMediaControlsPlay';

const meta = preview.meta({
	title: 'Components/Pill',
	component: Pill,
	args: {
		content: 'Pill',
	},
});

export const Default = meta.story();

export const WithVideoIcon = meta.story({
	args: {
		content: <time>3:35</time>,
		icon: <SvgMediaControlsPlay width={18} />,
	},
});

export const WithGalleryIcon = meta.story({
	args: {
		content: '10',
		icon: <SvgCamera />,
		iconSide: 'right',
	},
});

export const WithVideoIconAndPrefix = meta.story({
	args: {
		...WithVideoIcon.input.args,
		prefix: 'Video',
	},
});

export const WithGalleryIconAndPrefix = meta.story({
	args: {
		...WithGalleryIcon.input.args,
		prefix: 'Gallery',
		iconSide: 'left',
	},
});
