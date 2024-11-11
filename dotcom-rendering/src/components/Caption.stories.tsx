import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { Caption } from './Caption';
import { StarRating } from './StarRating/StarRating';

const meta = {
	component: Caption,
	title: 'Components/Caption',
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard = {
	args: {
		captionText: 'This is how a Standard caption looks',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const Analysis = {
	args: {
		captionText: 'This is how an Analysis caption looks',
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const PhotoEssay = {
	args: {
		captionText: '<ul><li>This is how a PhotoEssay caption looks</li></ul>',
		format: {
			design: ArticleDesign.PhotoEssay,
			display: ArticleDisplay.Immersive,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const SpecialReport = {
	args: {
		captionText: 'This is how a SpecialReport caption looks',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	},
} satisfies Story;

export const PhotoEssayWithWidthLimited = {
	args: {
		...PhotoEssay.args,
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
} satisfies Story;

export const WithCredit = {
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
} satisfies Story;

export const WithWidthLimited = {
	args: {
		captionText: 'This is how a caption looks with width limited',
		format: Standard.args.format,
		shouldLimitWidth: true,
	},
	parameters: {
		chromatic: PhotoEssayWithWidthLimited.parameters.chromatic,
	},
} satisfies Story;

export const WhenPadded = {
	args: {
		captionText: 'This is how a caption looks when padded',
		format: Standard.args.format,
		padCaption: true,
	},
} satisfies Story;

export const WhenOverlaid = {
	args: {
		isOverlaid: true,
		captionText: "This is how a caption looks when it's overlaid",
		format: Standard.args.format,
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
} satisfies Story;

export const WhenOverlaidWithStars = {
	args: {
		...WhenOverlaid.args,
		captionText:
			"This is how a caption looks when it's overlaid with stars",
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Showcase,
			theme: Pillar.News,
		},
	},
	decorators: [
		(Story) => (
			<>
				<Story />
				<div
					css={css`
						position: absolute;
						bottom: 0;
						background-color: ${palette.brandAlt[400]};
						color: ${palette.neutral[7]};
					`}
				>
					<StarRating rating={3} size="large" />
				</div>
			</>
		),
		WhenOverlaid.decorators,
	],
	parameters: WhenOverlaid.parameters,
} satisfies Story;

export const ForVideos = {
	args: {
		...Standard.args,
		mediaType: 'Video',
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
} satisfies Story;
