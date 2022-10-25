import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';
import { Section } from './Section';

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

const format = {
	news: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	},
	opinion: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Comment,
		theme: ArticlePillar.Opinion,
	},
	sport: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Sport,
	},
	culture: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Culture,
	},
	lifestyle: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Lifestyle,
	},
	specialReport: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReport,
	},
	specialReportAlt: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReportAlt,
	},
	labs: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.Labs,
	},
};

const photoEssayNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: ArticlePillar.News,
};

// Inline
export const SportInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.sport}
				palette={decidePalette(format.sport)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SportInline.story = {
	name: 'Sport, inline, Article',
};

export const LabsInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.labs}
				palette={decidePalette(format.labs)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LabsInline.story = {
	name: 'Labs, inline, Article',
};

export const LifestyleInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.lifestyle}
				palette={decidePalette(format.lifestyle)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LifestyleInline.story = {
	name: 'Lifestyle, inline, Article',
};

export const CultureInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.culture}
				palette={decidePalette(format.culture)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
CultureInline.story = {
	name: 'Culture, inline, Article',
};

export const NewsInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.news}
				palette={decidePalette(format.news)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
NewsInline.story = {
	name: 'News, inline, Article',
};

export const OpinionInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.opinion}
				palette={decidePalette(format.opinion)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
OpinionInline.story = {
	name: 'Opinion, inline, Comment',
};

export const SpecialReportInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.specialReport}
				palette={decidePalette(format.specialReport)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportInline.story = {
	name: 'SpecialReport, inline, Article',
};

// Supporting
export const SportSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.sport}
				palette={decidePalette(format.sport)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SportSupporting.story = {
	name: 'Sport, supporting, Article',
};

export const LabsSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.labs}
				palette={decidePalette(format.labs)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LabsSupporting.story = {
	name: 'Labs, supporting, Article',
};

export const LifestyleSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.lifestyle}
				palette={decidePalette(format.lifestyle)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LifestyleSupporting.story = {
	name: 'Lifestyle, supporting, Article',
};

export const CultureSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.culture}
				palette={decidePalette(format.culture)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
CultureSupporting.story = {
	name: 'Culture, supporting, Article',
};

export const NewsSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.news}
				palette={decidePalette(format.news)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
NewsSupporting.story = {
	name: 'News, supporting, Article',
};

export const OpinionSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.opinion}
				palette={decidePalette(format.opinion)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
OpinionSupporting.story = {
	name: 'Opinion, supporting, Comment',
};

export const SpecialReportSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.specialReport}
				palette={decidePalette(format.specialReport)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportSupporting.story = {
	name: 'SpecialReport, supporting, Article',
};

export const SpecialReportAltInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.specialReportAlt}
				palette={decidePalette(format.specialReportAlt)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportAltInline.story = {
	name: 'SpecialReportAlt, inline, Article',
};

export const SpecialReportAltSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format.specialReportAlt}
				palette={decidePalette(format.specialReportAlt)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportAltSupporting.story = {
	name: 'SpecialReportAlt, supporting, Article',
};

// PhotoEssay
export const PhotoEssayInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={photoEssayNews}
				palette={decidePalette(photoEssayNews)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
PhotoEssayInline.story = {
	name: 'News, inline, PhotoEssay',
};

export const PhotoEssaySupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={photoEssayNews}
				palette={decidePalette(photoEssayNews)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
PhotoEssaySupporting.story = {
	name: 'News, supporting, PhotoEssay',
};
