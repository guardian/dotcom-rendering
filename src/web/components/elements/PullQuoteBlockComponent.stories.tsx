import React from 'react';
import { css } from 'emotion';

import { Display, Design, Pillar, Special } from '@guardian/types';

import { decidePalette } from '@root/src/web/lib/decidePalette';
import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<Section showTopBorder={false}>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<div
				className={css`
					width: 620px;
					padding: 20px;
				`}
			>
				{children}
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</Section>
);

// Inline
export const SportInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Sport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
SportInline.story = {
	name: 'Sport, inline, Article',
};

export const LabsInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.Labs,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
LabsInline.story = {
	name: 'Labs, inline, Article',
};

export const LifestyleInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Lifestyle,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
LifestyleInline.story = {
	name: 'Lifestyle, inline, Article',
};

export const CultureInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Culture,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
CultureInline.story = {
	name: 'Culture, inline, Article',
};

export const NewsInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
NewsInline.story = {
	name: 'News, inline, Article',
};

export const OpinionInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Opinion,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
OpinionInline.story = {
	name: 'Opinion, inline, Article',
};

export const SpecialReportInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
SpecialReportInline.story = {
	name: 'SpecialReport, inline, Article',
};

// Supporting
export const SportSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Sport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
SportSupporting.story = {
	name: 'Sport, supporting, Article',
};

export const LabsSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.Labs,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
LabsSupporting.story = {
	name: 'Labs, supporting, Article',
};

export const LifestyleSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Lifestyle,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
LifestyleSupporting.story = {
	name: 'Lifestyle, supporting, Article',
};

export const CultureSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Culture,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
CultureSupporting.story = {
	name: 'Culture, supporting, Article',
};

export const NewsSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
NewsSupporting.story = {
	name: 'News, supporting, Article',
};

export const OpinionSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Opinion,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
OpinionSupporting.story = {
	name: 'Opinion, supporting, Article',
};

export const SpecialReportSupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
SpecialReportSupporting.story = {
	name: 'SpecialReport, supporting, Article',
};

// PhotoEssay
export const PhotoEssayInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
PhotoEssayInline.story = {
	name: 'News, inline, PhotoEssay',
};

export const PhotoEssaySupporting = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Article}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Container>
	);
};
PhotoEssaySupporting.story = {
	name: 'News, supporting, PhotoEssay',
};
