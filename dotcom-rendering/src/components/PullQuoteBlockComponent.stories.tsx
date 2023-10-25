import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitThemeMultipleFormats } from '../../.storybook/decorators/splitThemeDecorators';
import type { Config } from '../../src/types/configContext';
import { decidePalette } from '../lib/decidePalette';
import { getAllDesigns } from '../lib/format';
import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';
import { Section } from './Section';

const quote = {
	html: 'Comment is free, but facts are sacred.',
	attribution: 'C.P. Scott',
};

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

const pullQuoteStoryVariations = [
	ArticleDesign.Standard,
	ArticleDesign.Profile,
	ArticleDesign.Explainer,
	ArticleDesign.Timeline,
	ArticleDesign.LiveBlog,
	ArticleDesign.DeadBlog,
	ArticleDesign.Analysis,
	ArticleDesign.Feature,
	ArticleDesign.Interview,
	ArticleDesign.Recipe,
	ArticleDesign.Review,
	ArticleDesign.Obituary,
	ArticleDesign.Comment,
	ArticleDesign.Editorial,
];
const allSportsVariations = getAllDesigns({
	display: ArticleDisplay.Standard,
	theme: Pillar.Sport,
}).filter((format) => pullQuoteStoryVariations.includes(format.design));

const allNewsVariations = getAllDesigns({
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
}).filter((format) => pullQuoteStoryVariations.includes(format.design));

const allLifestyleVariations = getAllDesigns({
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
}).filter((format) => pullQuoteStoryVariations.includes(format.design));

export const Inline = (_: Config, { format }: { format: ArticleFormat }) => (
	<Section
		showTopBorder={false}
		centralBorder="full"
		showSideBorders={false}
		// Description is less intrusive, but isn't rendered if title prop not provided
		title={' '}
		description={ArticleDesign[format.design]}
	>
		<>
			<PullQuoteBlockComponent format={format} role="inline" {...quote} />
		</>
	</Section>
);

Inline.storyName = 'Inline - Sports variations';
Inline.decorators = [splitThemeMultipleFormats(allSportsVariations)];

export const Showcase = (_: Config, { format }: { format: ArticleFormat }) => (
	<Section
		showTopBorder={false}
		centralBorder="full"
		showSideBorders={false}
		key={format.theme}
		// Description is less intrusive, but isn't rendered if title prop not provided
		title={' '}
		description={ArticleDesign[format.design]}
	>
		<>
			<PullQuoteBlockComponent
				format={format}
				role="showcase"
				{...quote}
			/>
		</>
	</Section>
);

Showcase.storyName = 'Showcase - News variations';
Showcase.decorators = [splitThemeMultipleFormats(allNewsVariations)];

export const Supporting = (
	_: Config,
	{ format }: { format: ArticleFormat },
) => (
	<Section
		showTopBorder={false}
		centralBorder="full"
		showSideBorders={false}
		key={format.theme}
		backgroundColour={decidePalette(format).background.article}
		// Description is less intrusive, but isn't rendered if title prop not provided
		title={' '}
		description={ArticleDesign[format.design]}
	>
		<>
			<PullQuoteBlockComponent
				format={format}
				role="supporting"
				{...quote}
			/>
		</>
	</Section>
);
Supporting.storyName = 'Supporting - Culture variations';
Supporting.decorators = [splitThemeMultipleFormats(allLifestyleVariations)];
