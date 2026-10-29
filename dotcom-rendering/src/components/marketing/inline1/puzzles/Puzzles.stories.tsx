import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import lzstring from 'lz-string';
import Puzzles from './Puzzles';

const style = css`
	margin: 3em auto;
`;

const variant = {
	name: 'Inline1PuzzlesMessage',
	message: {
		type: 'Inline1PuzzlesMessage' as const,
	},
};

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof Puzzles>>;
const meta: Meta<Props> = {
	component: Puzzles,
	title: 'Components/marketing/Puzzles',
	args: {
		variant,
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div css={style}>
				<Puzzles {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic Puzzles',
};
