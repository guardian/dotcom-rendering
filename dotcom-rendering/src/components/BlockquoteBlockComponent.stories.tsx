import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { BlockquoteBlockComponent } from './BlockquoteBlockComponent';

const shortQuoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence</p> \n<p>A second paragraph</p> \n</blockquote>';
const blockquoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n<p>A second paragraph</p> \n</blockquote>';

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

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
Unquoted.decorators = [splitTheme(articleFormat)];

const NewsFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const News = () => {
	return (
		<div>
			<h1>News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

News.storyName = 'News';
News.decorators = [splitTheme(NewsFormat)];

const SportFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Sport,
};

export const Sport = () => {
	return (
		<div>
			<h1>Sport</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

Sport.storyName = 'Sport';
Sport.decorators = [splitTheme(SportFormat)];

const CultureFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Culture,
};

export const Culture = () => {
	return (
		<div>
			<h1>Culture</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

Culture.storyName = 'Culture';
Culture.decorators = [splitTheme(CultureFormat)];

const LifestyleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

export const Lifestyle = () => {
	return (
		<div>
			<h1>Lifestyle</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

Lifestyle.storyName = 'Lifestyle';
Lifestyle.decorators = [splitTheme(LifestyleFormat)];

const OpinionFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Opinion,
};

export const Opinion = () => {
	return (
		<div>
			<h1>Opinion</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

Opinion.storyName = 'Opinion';
Opinion.decorators = [splitTheme(OpinionFormat)];

const SpecialReportFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.SpecialReport,
};

export const SpecialReport = () => {
	return (
		<div>
			<h1>SpecialReport</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

SpecialReport.storyName = 'SpecialReport';
SpecialReport.decorators = [splitTheme(SpecialReportFormat)];

const LabsFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.Labs,
};

export const Labs = () => {
	return (
		<div>
			<h1>Labs</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

Labs.storyName = 'Labs';
Labs.decorators = [splitTheme(LabsFormat)];

const LiveBlogNewsFormat = {
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const LiveBlogNews = () => {
	return (
		<div>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

LiveBlogNews.storyName = 'LiveBlogNews';
LiveBlogNews.decorators = [splitTheme(LiveBlogNewsFormat)];

const DeadBlogNewsFormat = {
	design: ArticleDesign.DeadBlog,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const DeadBlogNews = () => {
	return (
		<div>
			<h1>DeadBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

DeadBlogNews.storyName = 'DeadBlogNews';
DeadBlogNews.decorators = [splitTheme(DeadBlogNewsFormat)];

const LiveBlogNewsSportFormat = {
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
	theme: Pillar.Sport,
};

export const LiveBlogNewsSport = () => {
	return (
		<div>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};

LiveBlogNewsSport.storyName = 'LiveBlogNewsSport';
LiveBlogNewsSport.decorators = [splitTheme(LiveBlogNewsSportFormat)];

const DeadBlogSportFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Sport,
};
export const DeadBlogSport = () => {
	return (
		<div css={containerStyles}>
			<h1>DeadBlog Sport</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};
DeadBlogSport.storyName = 'DeadBlogSport';
DeadBlogSport.decorators = [splitTheme(DeadBlogSportFormat)];

const SpecialReportAltStandardFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.SpecialReportAlt,
};
export const SpecialReportAltStandard = () => {
	return (
		<div css={containerStyles}>
			<h1>SpecialReportAlt Standard</h1>
			<BlockquoteBlockComponent html={blockquoteHtml} quoted={true} />
		</div>
	);
};
SpecialReportAltStandard.storyName = 'SpecialReportAltStandard';
SpecialReportAltStandard.decorators = [
	splitTheme(SpecialReportAltStandardFormat),
];

const SpecialReportAltCommentFormat = {
	design: ArticleDesign.Comment,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.SpecialReportAlt,
};
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
	splitTheme(SpecialReportAltCommentFormat),
];
