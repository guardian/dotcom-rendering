import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { UnlockPremiumPuzzlesModal } from './UnlockPremiumPuzzlesModal';

const meta = {
	title: 'Components/UnlockPremiumPuzzlesModal',
	component: UnlockPremiumPuzzlesModal,
	decorators: [
		(Story) => (
			<div
				css={css`
					position: relative;
					min-height: 700px;
				`}
			>
				<p>Page content behind the modal</p>
				<Story />
			</div>
		),
	],
	args: {
		idUrl: 'https://profile.theguardian.com',
		returnFromSubscribeToPath: '/puzzles-and-games',
		returnToArchivePath: '/puzzles-and-games/logic-puzzles/archive',
	},
} satisfies Meta<typeof UnlockPremiumPuzzlesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomContent = {
	args: {
		title: 'Custom title',
		subtitle: 'Custom subtitle:',
		benefits: ['First benefit', 'Second benefit'],
	},
} satisfies Story;
