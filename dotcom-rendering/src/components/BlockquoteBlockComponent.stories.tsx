import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorators';
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

export const StandardDesign = () => {
	return (
		<div>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

StandardDesign.storyName = 'Standard Design - All theme variations';
StandardDesign.decorators = [splitTheme(allThemeStandardVariations)];

export const LiveBlogNews = () => {
	return (
		<div>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

LiveBlogNews.storyName = 'LiveBlogNews';
LiveBlogNews.decorators = [
	splitTheme([
		{
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];

export const DeadBlogNews = () => {
	return (
		<div>
			<h1>DeadBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DeadBlogNews.storyName = 'DeadBlogNews';
DeadBlogNews.decorators = [
	splitTheme([
		{
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];

export const LiveBlogSport = () => {
	return (
		<div>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

LiveBlogSport.storyName = 'LiveBlogSport';
LiveBlogSport.decorators = [
	splitTheme([
		{
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

export const DeadBlogSport = () => {
	return (
		<div css={containerStyles}>
			<h1>DeadBlog Sport</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};
DeadBlogSport.storyName = 'DeadBlogSport';
DeadBlogSport.decorators = [
	splitTheme([
		{
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

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
