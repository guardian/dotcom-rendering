import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace, textSans14 } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { createRoot } from 'react-dom/client';
import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { ArticleDisplay } from '../lib/articleFormat';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';

const meta = {
	component: AdSlot,
	title: 'Components/Ad Slot (web)',
} satisfies Meta<typeof AdSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

const adLabelsStyles = css`
	${textSans14}
	padding: ${remSpace[3]};
	display: flex;
	justify-content: center;
	width: 100%;
	p {
		margin: 0;
		font-size: 16px;
		font-weight: 400;
		color: ${palette('--ad-labels-text')};
	}
`;

const rightAdSlotStyles = css`
	padding-bottom: 250px;
	width: 300px;
`;

const topAboveNavAdSlotStyles = css`
	padding-bottom: 250px;
	width: 100%;
`;

function renderTestAd(adStyles: SerializedStyles, slot: HTMLElement) {
	const root = createRoot(slot);

	root.render(
		<aside>
			<div css={adLabelsStyles}>
				<p>Advertisement</p>
			</div>
			<div css={adStyles}></div>
		</aside>,
	);
}

export const Right = {
	args: {
		position: 'right',
		display: ArticleDisplay.Standard,
	},
	decorators: [rightColumnDecorator],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slot = await canvas.findByTestId('slot');

		renderTestAd(rightAdSlotStyles, slot);
	},
} satisfies Story;

export const TopAboveNav = {
	args: {
		position: 'top-above-nav',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slot = await canvas.findByTestId('slot');

		renderTestAd(topAboveNavAdSlotStyles, slot);
	},
} satisfies Story;
