import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
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
	theme: Pillar.News,
};

const photoEssayNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: Pillar.News,
};

// Inline
export const SportInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Sport,
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
SportInline.storyName = 'Sport, inline, Article';

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
LabsInline.storyName = 'Labs, inline, Article';

export const LifestyleInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Lifestyle,
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
LifestyleInline.storyName = 'Lifestyle, inline, Article';

export const CultureInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Culture,
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
CultureInline.storyName = 'Culture, inline, Article';

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
NewsInline.storyName = 'News, inline, Article';

export const OpinionInline = () => {
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
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
OpinionInline.storyName = 'Opinion, inline, Comment';

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
SpecialReportInline.storyName = 'SpecialReport, inline, Article';

// Supporting
export const SportSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Sport,
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
SportSupporting.storyName = 'Sport, supporting, Article';

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
LabsSupporting.storyName = 'Labs, supporting, Article';

export const LifestyleSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Lifestyle,
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
LifestyleSupporting.storyName = 'Lifestyle, supporting, Article';

export const CultureSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Culture,
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
CultureSupporting.storyName = 'Culture, supporting, Article';

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
NewsSupporting.storyName = 'News, supporting, Article';

export const OpinionSupporting = () => {
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
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
OpinionSupporting.storyName = 'Opinion, supporting, Comment';

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
SpecialReportSupporting.storyName = 'SpecialReport, supporting, Article';

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
SpecialReportAltInline.storyName = 'SpecialReportAlt, inline, Article';

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
SpecialReportAltSupporting.storyName = 'SpecialReportAlt, supporting, Article';

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
PhotoEssayInline.storyName = 'News, inline, PhotoEssay';

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
PhotoEssaySupporting.storyName = 'News, supporting, PhotoEssay';
