import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { ContainerLayout } from './ContainerLayout';
import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

// Inline
export const SportInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Sport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
SportInline.story = {
	name: 'Sport, inline, Article',
};

export const LabsInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
LabsInline.story = {
	name: 'Labs, inline, Article',
};

export const LifestyleInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Lifestyle,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
LifestyleInline.story = {
	name: 'Lifestyle, inline, Article',
};

export const CultureInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Culture,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
CultureInline.story = {
	name: 'Culture, inline, Article',
};

export const NewsInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
NewsInline.story = {
	name: 'News, inline, Article',
};

export const OpinionInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Comment}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.Opinion,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
OpinionInline.story = {
	name: 'Opinion, inline, Comment',
};

export const SpecialReportInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
SpecialReportInline.story = {
	name: 'SpecialReport, inline, Article',
};

// Supporting
export const SportSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Sport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
SportSupporting.story = {
	name: 'Sport, supporting, Article',
};

export const LabsSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
LabsSupporting.story = {
	name: 'Labs, supporting, Article',
};

export const LifestyleSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Lifestyle,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
LifestyleSupporting.story = {
	name: 'Lifestyle, supporting, Article',
};

export const CultureSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Culture,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
CultureSupporting.story = {
	name: 'Culture, supporting, Article',
};

export const NewsSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
NewsSupporting.story = {
	name: 'News, supporting, Article',
};

export const OpinionSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Comment}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.Opinion,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
OpinionSupporting.story = {
	name: 'Opinion, supporting, Comment',
};

export const SpecialReportSupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.Standard}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
SpecialReportSupporting.story = {
	name: 'SpecialReport, supporting, Article',
};

// PhotoEssay
export const PhotoEssayInline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.PhotoEssay}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
PhotoEssayInline.story = {
	name: 'News, inline, PhotoEssay',
};

export const PhotoEssaySupporting = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				design={ArticleDesign.PhotoEssay}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</ContainerLayout>
	);
};
PhotoEssaySupporting.story = {
	name: 'News, supporting, PhotoEssay',
};
