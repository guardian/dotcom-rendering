import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { CaptionBlockComponent } from './CaptionBlockComponent';

const meta = preview.meta({
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
});

export const Default = meta.story({
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
});

export const WithDefaults = meta.story({
	args: {
		...Default.input.args,
		padCaption: undefined,
		credit: undefined,
		displayCredit: undefined,
		shouldLimitWidth: undefined,
		isOverlaid: undefined,
	},
});

export const PhotoEssay = meta.story({
	args: {
		...Default.input.args,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.Lifestyle,
		},
	},
});

export const PhotoEssayUsingHTML = meta.story({
	args: {
		...PhotoEssay.input.args,
		captionText:
			'<ul><li>Line 1 text</li><li>Line 2 text</li><li>Line 3 text</li></ul>',
	},
});

export const WhenPadded = meta.story({
	args: {
		...Default.input.args,
		padCaption: true,
	},
});

export const WithWidthLimited = meta.story({
	args: {
		...Default.input.args,
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
});

export const WithCredit = meta.story({
	args: {
		...Default.input.args,
		displayCredit: true,
	},
});

export const WhenOverlaid = meta.story({
	args: {
		...Default.input.args,
		captionText: WithWidthLimited.input.args.captionText,
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
});
