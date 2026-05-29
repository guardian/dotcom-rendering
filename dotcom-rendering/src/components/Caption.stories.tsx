import { css } from '@emotion/react';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { Caption } from './Caption';

const meta = preview.meta({
	component: Caption,
	title: 'Components/Caption',
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const Standard = meta.story({
	args: {
		captionText: 'This is how a Standard caption looks',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
});

export const Analysis = meta.story({
	args: {
		captionText: 'This is how an Analysis caption looks',
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
});

export const PhotoEssay = meta.story({
	args: {
		captionText: '<ul><li>This is how a PhotoEssay caption looks</li></ul>',
		format: {
			design: ArticleDesign.PhotoEssay,
			display: ArticleDisplay.Immersive,
			theme: Pillar.News,
		},
	},
});

export const SpecialReport = meta.story({
	args: {
		captionText: 'This is how a SpecialReport caption looks',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	},
});

export const PhotoEssayWithWidthLimited = meta.story({
	args: {
		...PhotoEssay.input.args,
		shouldLimitWidth: true,
	},
	decorators: [
		(Story) => (
			<>
				<Story />
				<div
					css={css`
						height: 100px;
					`}
				/>
			</>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'vertical leftCol': allModes['vertical leftCol'],
			},
		},
	},
});

export const WithCredit = meta.story({
	args: {
		captionText: 'This is how a Feature caption looks with credit showing',
		format: {
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
		credit: 'Credited to Able Jones',
		displayCredit: true,
	},
});

export const WithWidthLimited = meta.story({
	args: {
		captionText: 'This is how a caption looks with width limited',
		format: Standard.input.args.format,
		shouldLimitWidth: true,
	},
	decorators: PhotoEssayWithWidthLimited.input.decorators,
	parameters: {
		chromatic: PhotoEssayWithWidthLimited.input.parameters.chromatic,
	},
});

export const WhenPadded = meta.story({
	args: {
		captionText: 'This is how a caption looks when padded',
		format: Standard.input.args.format,
		padCaption: true,
	},
});

export const WhenOverlaid = meta.story({
	args: {
		isOverlaid: true,
		captionText: "This is how a caption looks when it's overlaid",
		format: Standard.input.args.format,
		padCaption: true,
	},
	decorators: (Story) => (
		<div
			css={css`
				position: relative;
				height: 600px;
				width: 800px;
			`}
		>
			<img
				alt=""
				src="https://i.guim.co.uk/img/media/eaecb92d15c7e9691274226d0935038bfcc9de53/0_0_6720_4480/master/6720.jpg?width=880&quality=45&auto=format&fit=max&dpr=2&s=452e8da9ad0b2ba274ae8987b3799fd4"
				css={css`
					height: 100%;
					width: 100%;
					object-fit: cover;
				`}
			/>
			<Story />
		</div>
	),
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'vertical desktop': allModes['vertical desktop'],
			},
		},
	},
});

export const ForVideos = meta.story({
	args: {
		...Standard.input.args,
		mediaType: 'YoutubeVideo',
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'vertical mobile': allModes['vertical mobile'],
				'vertical mobileLandscape':
					allModes['vertical mobileLandscape'],
				'vertical phablet': allModes['vertical phablet'],
			},
		},
	},
});

export const WhenImmersive = meta.story({
	args: {
		captionText:
			'This is how a caption looks with immersive padding. Additional padding is added to the left and right of the caption to compensate for the negative margins applied to immersive images.',
		format: Standard.input.args.format,
		isImmersive: true,
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'vertical mobile': allModes['vertical mobile'],
				'vertical mobileLandscape':
					allModes['vertical mobileLandscape'],
				'vertical phablet': allModes['vertical tablet'],
				'vertical desktop': allModes['vertical desktop'],
				'vertical leftCol': allModes['vertical leftCol'],
			},
		},
	},
});
