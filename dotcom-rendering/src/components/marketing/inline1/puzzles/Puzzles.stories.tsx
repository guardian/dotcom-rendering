import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import lzstring from 'lz-string';
import { tracking } from '../utils/storybook';
import Puzzles from './Puzzles';

const style = css`
	margin: 3em auto;
`;

const props = {
	variant: {
		name: 'Inline1PuzzlesMessage',
		message: {
			type: 'Inline1PuzzlesMessage' as const,
		},
	},
	tracking,
};

const page = window.guardian.config
	.page as typeof window.guardian.config.page & {
	tones: string;
	pillar: string;
};

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof Puzzles>>;
const meta: Meta<Props> = {
	component: Puzzles,
	title: 'Components/marketing/inline1/Puzzles',
	args: props,
};

export default meta;

type Story = StoryObj<Props>;

export const Default: Story = {
	name: 'Basic Puzzles',
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};
		page.tones = 'Features';
		page.pillar = 'News';
		return (
			<div css={style}>
				<Puzzles {...args} {...jsonProps} />
			</div>
		);
	},
};

export const OnOpinionOrAnalysis: Story = {
	name: 'Basic Puzzles White Background',
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};
		page.tones = 'Analysis';
		page.pillar = 'Opinion';
		return (
			<div css={style}>
				<Puzzles {...args} {...jsonProps} />
			</div>
		);
	},
};
