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

const rightAdSlotStyles = css`
	clear: both;
	padding-bottom: 258px;
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slot = await canvas.findByTestId('slot');

		renderTestAd(rightAdSlotStyles, slot);
	},
} satisfies Story;
