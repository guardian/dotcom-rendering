import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchStat } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Stat',
	component: FootballMatchStat,
	decorators: [
		(Story) => (
			<div
				css={css`
					padding: ${space[4]}px;
					background-color: ${palette.neutral[97]};
				`}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof FootballMatchStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Possession = {
	args: {},
} satisfies Story;
