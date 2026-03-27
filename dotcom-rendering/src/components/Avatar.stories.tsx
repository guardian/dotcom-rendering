import preview from '../../.storybook/preview';
import { Avatar } from './Avatar';

const meta = preview.meta({
	component: Avatar,
	title: 'Components/Avatar',
	decorators: [
		(Story, context) => (
			<div
				style={{
					height: context.parameters.size,
					width: context.parameters.size,
				}}
			>
				<Story />
			</div>
		),
	],
});

export const RoundAvatar = meta.story({
	args: {
		src: 'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
		alt: 'The alt of the image',
		shape: 'round',
	},
	parameters: {
		size: '136px',
	},
	name: 'Round Avatar Cutout With Coloured Background',
});
