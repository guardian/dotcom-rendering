import { css } from '@emotion/react';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { VimeoBlockComponent } from './VimeoBlockComponent';

const meta = preview.meta({
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
});

export const SmallAspectRatio = meta.story({
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
});

export const LargeAspectRatio = meta.story({
	...SmallAspectRatio.input,
	args: {
		...SmallAspectRatio.input.args,
		height: 259,
		width: 460,
	},
});

export const VerticalAspectRatio = meta.story({
	...SmallAspectRatio.input,
	args: {
		...SmallAspectRatio.input.args,
		height: 818,
		width: 460,
	},
});
