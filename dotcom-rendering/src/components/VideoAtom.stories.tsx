import { css } from '@emotion/react';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { VideoAtom } from './VideoAtom';

const meta = {
	title: 'Components/VideoAtom',
	component: VideoAtom,
	parameters: {
		// Chromatic ignores video elements by design so there's no point trying to snapshot here
		// https://www.chromatic.com/docs/ignoring-elements
		chromatic: { disable: true },
	},
} satisfies Meta<typeof VideoAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizeDecorator: Decorator = (Story) => (
	<div
		css={css`
			width: 800px;
			margin: 25px;
		`}
	>
		<Story />
	</div>
);

export const Default = {
	args: {
		poster: 'https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg',
		assets: [
			{
				url: 'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
				mimeType: 'video/mp4',
			},
		],
	},
	decorators: [sizeDecorator],
} satisfies Story;

export const Large = {
	...Default,
	args: {
		...Default.args,
		height: 500,
		width: 880,
	},
} satisfies Story;

export const NoPoster = {
	...Default,
	args: {
		...Default.args,
		poster: undefined,
	},
} satisfies Story;
