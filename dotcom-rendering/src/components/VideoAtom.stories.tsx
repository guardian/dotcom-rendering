import { css } from '@emotion/react';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { VideoAtom } from './VideoAtom';

const meta = preview.meta({
	title: 'Components/VideoAtom',
	component: VideoAtom,
	parameters: {
		// Chromatic ignores video elements by design so there's no point trying to snapshot here
		// https://www.chromatic.com/docs/ignoring-elements
		chromatic: { disable: true },
	},
});

export const Default = meta.story({
	args: {
		poster: 'https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg',
		assets: [
			{
				url: 'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
				mimeType: 'video/mp4',
			},
		],
		isMainMedia: false,
		format: {
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
		caption: 'This is a video caption',
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					width: 800px;
					margin: 25px;
				`}
			>
				<Story />
			</div>
		),
	],
});

export const Large = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		height: 500,
		width: 880,
	},
});

export const NoPoster = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		poster: undefined,
	},
});
