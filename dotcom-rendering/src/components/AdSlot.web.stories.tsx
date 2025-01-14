import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { css } from '@emotion/react';
import { remSpace, textSans14 } from '@guardian/source/foundations';
import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { AdSlot } from './AdSlot.web';
import { palette } from '../palette';
import { ArticleDisplay } from '../lib/articleFormat';
import { createRoot } from 'react-dom/client';

const meta = {
	component: AdSlot,
	title: 'Components/Ad Slot (web)',
	decorators: [rightColumnDecorator],
} satisfies Meta<typeof AdSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

const adLabelsStyles = css`
	${textSans14}
	padding: ${remSpace[3]};
	float: left;
	display: flex;
	justify-content: center;

	/* We need to account for padding on both sides */
	width: calc(100% - 2 * ${remSpace[3]});

	p {
		margin: 0;
		float: left;
		font-size: 16px;
		font-weight: 400;
		color: ${palette('--ad-labels-text')};
	}
`;

const adSlotStyles = css`
	clear: both;
	padding-bottom: 258px;
	width: 100%;
`;

export const RightStandard = {
	args: {
		position: 'right',
		display: ArticleDisplay.Standard,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slot = await canvas.findByTestId('slot');

		const root = createRoot(slot);

		root.render(
			<aside>
				<div css={adLabelsStyles}>
					<p>Advertisement</p>
				</div>
				<div css={adSlotStyles}></div>
			</aside>,
		);
	},
} satisfies Story;
