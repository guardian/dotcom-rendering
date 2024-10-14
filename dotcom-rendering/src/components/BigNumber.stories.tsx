import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { palette } from '../palette';
import { BigNumber as BigNumberComponent } from './BigNumber';

const meta = {
	title: 'Components/BigNumber',
	component: BigNumberComponent,
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Meta<typeof BigNumberComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BigNumber = {
	args: { index: 0 },
	render: () => (
		<div
			css={css`
				padding: ${space[2]}px;
				font-size: 3rem;
				fill: ${palette('--article-text')};
			`}
		>
			<BigNumberComponent index={0} />
			<br />
			<BigNumberComponent index={1} />
			<br />
			<BigNumberComponent index={2} />
			<br />
			<BigNumberComponent index={3} />
			<br />
			<BigNumberComponent index={4} />
			<br />
			<BigNumberComponent index={5} />
			<br />
			<BigNumberComponent index={6} />
			<br />
			<BigNumberComponent index={7} />
			<br />
			<BigNumberComponent index={8} />
			<br />
			<BigNumberComponent index={9} />
			<br />
			<BigNumberComponent index={10} />
		</div>
	),
} satisfies Story;
