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

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

const photoEssayNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: ArticlePillar.News,
};

// Inline
export const SportInline = () => {
	const format = {
		...defaultFormat,
		theme: ArticlePillar.Sport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticlePillar.Lifestyle,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticlePillar.Culture,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
				format={defaultFormat}
				palette={decidePalette(defaultFormat)}
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
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: ArticlePillar.Opinion,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticlePillar.News,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticlePillar.Lifestyle,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticlePillar.Culture,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
				format={defaultFormat}
				palette={decidePalette(defaultFormat)}
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
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: ArticlePillar.Opinion,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
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
