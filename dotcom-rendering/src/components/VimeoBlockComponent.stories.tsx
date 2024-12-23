import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { VimeoBlockComponent } from './VimeoBlockComponent';

const meta = {
	component: VimeoBlockComponent,
	title: 'Components/Vimeo Component',
	decorators: [
		(Story) => (
			<div
				css={css`
					max-width: 620px;
					padding: 20px;
				`}
			>
				<p>abc</p>
				<Story />
				<p>abc</p>
			</div>
		),
	],
	/**
	 * Skipped (flaky).
	 *
	 * This story fails intermittently. Sometimes the video doesn't load
	 * with the error message: "We couldn't verify the security of your connection."
	 *
	 * Example: https://www.chromatic.com/test?appId=63e251470cfbe61776b0ef19&id=6762b11e0dbf28eb24702ff1
	 */
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Meta<typeof VimeoBlockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallAspectRatio = {
	args: {
		embedUrl: 'https://player.vimeo.com/video/327310297?app_id=122963',
		height: 250,
		width: 250,
		caption: 'blah',
		credit: '',
		title: '',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		isMainMedia: false,
	},
} satisfies Story;

export const LargeAspectRatio = {
	...SmallAspectRatio,
	args: {
		...SmallAspectRatio.args,
		height: 259,
		width: 460,
	},
} satisfies Story;

export const VerticalAspectRatio = {
	...SmallAspectRatio,
	args: {
		...SmallAspectRatio.args,
		height: 818,
		width: 460,
	},
} satisfies Story;
