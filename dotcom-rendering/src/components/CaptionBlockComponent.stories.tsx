import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { CaptionBlockComponent } from './CaptionBlockComponent';

const meta = {
	component: CaptionBlockComponent,
	title: 'Components/Caption Block Component',
	decorators: [centreColumnDecorator],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof CaptionBlockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		captionText: 'Caption text',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		padCaption: false,
		credit: 'Credit text',
		displayCredit: false,
		shouldLimitWidth: false,
		isOverlaid: false,
	},
} satisfies Story;

export const WithDefaults = {
	args: {
		...Default.args,
		padCaption: undefined,
		credit: undefined,
		displayCredit: undefined,
		shouldLimitWidth: undefined,
		isOverlaid: undefined,
	},
} satisfies Story;

export const PhotoEssay = {
	args: {
		...Default.args,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.Lifestyle,
		},
	},
} satisfies Story;

export const PhotoEssayUsingHTML = {
	args: {
		...PhotoEssay.args,
		captionText:
			'<ul><li>Line 1 text</li><li>Line 2 text</li><li>Line 3 text</li></ul>',
	},
} satisfies Story;

export const WhenPadded = {
	args: {
		...Default.args,
		padCaption: true,
	},
} satisfies Story;

export const WithWidthLimited = {
	args: {
		...Default.args,
		captionText:
			'Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit',
		shouldLimitWidth: true,
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'horizontal leftCol': allModes['horizontal leftCol'],
			},
		},
	},
} satisfies Story;

export const WithCredit = {
	args: {
		...Default.args,
		displayCredit: true,
	},
} satisfies Story;

export const WhenOverlaid = {
	args: {
		...Default.args,
		captionText: WithWidthLimited.args.captionText,
		isOverlaid: true,
		format: {
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Comment,
			theme: Pillar.Sport,
		},
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': { disable: true },
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
} satisfies Story;
