import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/format';
import { BlockquoteBlockComponent } from './BlockquoteBlockComponent';

const shortQuoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence</p> \n<p>A second paragraph</p> \n</blockquote>';
const blockquoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n<p>A second paragraph</p> \n</blockquote>';

export default {
	component: BlockquoteBlockComponent,
	title: 'Components/BlockquoteComponent',
};

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export const Unquoted = () => {
	return (
		<div css={containerStyles}>
			<h1>Long</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} />
			<h1>Short</h1>
			<BlockquoteBlockComponent html={shortQuoteHtml} />
		</div>
	);
};
Unquoted.storyName = 'Unquoted';
Unquoted.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];

const blockQuoteStoryVariations = [
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
] as const satisfies ReadonlyArray<ArticleDesign>;

const themeVariations = [
	Pillar.Sport,
	Pillar.News,
	Pillar.Culture,
	Pillar.Opinion,
	Pillar.Lifestyle,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.SpecialReportAlt,
	ArticleSpecial.Labs,
];

const allThemeStandardVariations = themeVariations.map((theme) => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme,
}));

const allLiveBlogVariations = themeVariations.map((theme) => ({
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
	theme,
}));

const allDeadBlogVariations = themeVariations.map((theme) => ({
	design: ArticleDesign.DeadBlog,
	display: ArticleDisplay.Standard,
	theme,
}));

const allNewsVariations = blockQuoteStoryVariations.map((design) => ({
	design,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
}));

const allCultureVariations = blockQuoteStoryVariations.map((design) => ({
	design,
	display: ArticleDisplay.Standard,
	theme: Pillar.Culture,
}));

const allSportVariations = blockQuoteStoryVariations.map((design) => ({
	design,
	display: ArticleDisplay.Standard,
	theme: Pillar.Sport,
}));

export const StandardDesign = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

StandardDesign.storyName = 'Standard Design - All theme variations';
StandardDesign.decorators = [splitTheme(allThemeStandardVariations)];

export const DesignVariationsNews = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DesignVariationsNews.storyName = 'News Pillar - Design variations';
DesignVariationsNews.decorators = [splitTheme(allNewsVariations)];

export const DesignVariationsCulture = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DesignVariationsCulture.storyName = 'Culture Pillar - Design variations';
DesignVariationsCulture.decorators = [splitTheme(allCultureVariations)];

export const DesignVariationsSport = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DesignVariationsSport.storyName = 'Sport Pillar - Design variations';
DesignVariationsSport.decorators = [splitTheme(allSportVariations)];

export const LiveBlogDesign = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

LiveBlogDesign.storyName = 'LiveBlog Design - All theme variations';
LiveBlogDesign.decorators = [splitTheme(allLiveBlogVariations)];

export const DeadBlogDesign = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DeadBlogDesign.storyName = 'DeadBlog Design - All theme variations';
DeadBlogDesign.decorators = [splitTheme(allDeadBlogVariations)];

export const SpecialReportAltComment = () => {
	return (
		<div css={containerStyles}>
			<h1>SpecialReportAlt Comment</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};
SpecialReportAltComment.storyName = 'SpecialReportAltComment';
SpecialReportAltComment.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	]),
];
