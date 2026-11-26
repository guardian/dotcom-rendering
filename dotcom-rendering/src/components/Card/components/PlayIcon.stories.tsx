import preview from '../../../../.storybook/preview';
import { PlayIcon as PlayIconComponent } from './PlayIcon';

const meta = preview.meta({
	component: PlayIconComponent,
	title: 'Components/Play Icon',
});

export const Narrow = meta.story({
	args: {
		iconWidth: 'narrow',
	},
});

export const Wide = meta.story({
	render: () => (
		<div
			/**
			 * Wide icons are centered and have absolute position.
			 * This is required so that they are fully visible.
			 */
			style={{
				position: 'relative',
				height: '100px',
				width: '100px',
			}}
		>
			<PlayIconComponent iconWidth="wide" />
		</div>
	),
});
