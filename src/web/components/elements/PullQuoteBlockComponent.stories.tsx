import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types/Format';

import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
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
				pillar="news"
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

export const Comment = () => {
	return (
		<Container>
			<PullQuoteBlockComponent
				design={Design.Comment}
				pillar="opinion"
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
				pillar="opinion"
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
				pillar="lifestyle"
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
				pillar="lifestyle"
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
				pillar="culture"
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
