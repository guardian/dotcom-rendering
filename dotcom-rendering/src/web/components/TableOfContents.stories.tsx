import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { TableOfContentsItem } from '../../types/frontend';
import { TableOfContents } from './TableOfContents.importable';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: TableOfContents,
	title: 'Components/TableOfContents',
};

const headline1: TableOfContentsItem = {
	id: 'first-h2-text',
	title: 'First h2 text',
};
const headline2: TableOfContentsItem = {
	id: 'second-h2-text',
	title: 'Second h2 text',
};
const headline3: TableOfContentsItem = {
	id: 'third-h2-text',
	title: 'Third h2 text',
};

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const immersiveDisplayFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Immersive,
	theme: ArticlePillar.News,
};

const tableItems = [headline1, headline2, headline3];

export const defaultStory = () => {
	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} format={format} />
		</Wrapper>
	);
};

defaultStory.story = { name: 'default' };

export const immersive = () => {
	return (
		<Wrapper>
			<TableOfContents
				tableOfContents={tableItems}
				format={immersiveDisplayFormat}
			/>
		</Wrapper>
	);
};

immersive.story = { name: 'immersive' };
