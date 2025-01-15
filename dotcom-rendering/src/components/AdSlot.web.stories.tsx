import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace, textSans14 } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { createRoot } from 'react-dom/client';
import {
	centreColumnDecorator,
	rightColumnDecorator,
} from '../../.storybook/decorators/gridDecorators';
import { ArticleDisplay } from '../lib/articleFormat';
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
	}
`;

const squareAdStyles = css`
	padding-bottom: 250px;
	width: 300px;
`;

const bannerAdStyles = css`
	padding-bottom: 250px;
	width: 100%;
`;

function renderTestAd(
	adStyles: SerializedStyles,
	slotId = 'slot',
): Story['play'] {
	return async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slot = await canvas.findByTestId(slotId);
		const root = createRoot(slot);

		root.render(
			<aside>
				<div css={adLabelsStyles}>
					<p>Advertisement</p>
				</div>
				<div css={adStyles}></div>
			</aside>,
		);
	};
}

export const Right = {
	args: {
		position: 'right',
		display: ArticleDisplay.Standard,
	},
	decorators: [rightColumnDecorator],
	play: renderTestAd(squareAdStyles),
} satisfies Story;

export const TopAboveNav = {
	args: {
		position: 'top-above-nav',
	},
	play: renderTestAd(bannerAdStyles),
} satisfies Story;

export const FrontsBanner = {
	args: {
		position: 'fronts-banner',
		index: 1,
	},
	play: renderTestAd(bannerAdStyles),
} satisfies Story;

export const LiveblogInline = {
	args: {
		position: 'liveblog-inline',
		index: 0,
	},
	decorators: [centreColumnDecorator],
	play: renderTestAd(bannerAdStyles, 'liveblog-inline--inline1'),
} satisfies Story;

export const Merchandising = {
	args: {
		position: 'merchandising',
	},
	decorators: [centreColumnDecorator],
	play: renderTestAd(bannerAdStyles),
} satisfies Story;
