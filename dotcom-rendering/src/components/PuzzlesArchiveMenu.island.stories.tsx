import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from 'storybook/test';
import type { PuzzleItem } from '../types/puzzlesPage';
import { PuzzlesArchiveMenu } from './PuzzlesArchiveMenu.island';

const archive = (title: string): PuzzleItem => ({
	id: `archive-${title.toLowerCase().replace(/\s+/g, '-')}`,
	title,
	type: 'crossword',
	set: title.toLowerCase(),
	cardVariant: 'archive',
	url: `/puzzles-and-games/crosswords/archive?type=${encodeURIComponent(title.toLowerCase())}`,
});

const archives = [
	'Quick',
	'Mini',
	'Cryptic',
	'Quick cryptic',
	'Quiptic',
	'Weekend',
	'Prize',
	'Sunday quick',
	'Genius',
	'Special',
].map(archive);

const meta = {
	component: PuzzlesArchiveMenu,
	title: 'Components/PuzzlesArchiveMenu',
	parameters: {
		chromatic: {
			viewports: [
				320,
				breakpoints.mobileLandscape,
				breakpoints.tablet,
				breakpoints.desktop,
			],
		},
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					/* The open menu is absolutely positioned, so reserve its height. */
					min-height: 620px;
					padding: 20px;
				`}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PuzzlesArchiveMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed = {
	args: { archives, label: 'Crosswords archive' },
} satisfies Story;

export const Open = {
	args: { archives, label: 'Crosswords archive' },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText('Crosswords archive'));
	},
} satisfies Story;

export const OpenWithLongTitles = {
	args: {
		archives: [
			'Quick',
			'A crossword archive with a much longer title than usual',
			'Genius',
		].map(archive),
		label: 'Crosswords archive',
	},
	play: Open.play,
} satisfies Story;
