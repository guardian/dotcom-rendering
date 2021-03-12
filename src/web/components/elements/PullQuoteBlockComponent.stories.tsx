import React from 'react';
import { css } from 'emotion';

import { Display, Design, Pillar } from '@guardian/types';

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

export const Article = () => {
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
			/>
		</Container>
	);
};
Article.story = {
	name: 'with design Article - inline',
};

export const ArticleAttribution = () => {
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
ArticleAttribution.story = {
	name: 'with design Article - inline and attribution',
};

export const ArticleAttributionOpinion = () => {
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
ArticleAttributionOpinion.story = {
	name: 'with design Article Opinion - inline and attribution',
};

export const Comment = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Comment}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Opinion,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
			/>
		</Container>
	);
};
Comment.story = {
	name: 'with design Comment - supporting',
};

export const CommentAttr = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Comment}
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
CommentAttr.story = {
	name: 'with design Comment with attribution - inline',
};

export const PhotoEssay = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.PhotoEssay}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Lifestyle,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="supporting"
			/>
		</Container>
	);
};
PhotoEssay.story = {
	name: 'with design PhotoEssay - supporting',
};

export const PhotoEssayAttr = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.PhotoEssay}
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
PhotoEssayAttr.story = {
	name: 'with design PhotoEssay and attribution - supporting',
};

export const PhotoEssayInline = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.PhotoEssay}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Culture,
				})}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
			/>
		</Container>
	);
};
PhotoEssayInline.story = {
	name: 'with design PhotoEssay - inline',
};
