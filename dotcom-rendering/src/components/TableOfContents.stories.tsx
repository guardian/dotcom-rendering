import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { TableOfContentsItem } from '../types/frontend';
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
	theme: Pillar.News,
};

const immersiveDisplayFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Immersive,
	theme: Pillar.News,
};

const numberedListDisplayFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.NumberedList,
	theme: Pillar.News,
};

const tableItems = [headline1, headline2, headline3];

export const defaultStory = () => {
	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} format={format} />
		</Wrapper>
	);
};

defaultStory.storyName = 'default';

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

immersive.storyName = 'immersive';

export const numberedList = () => {
	return (
		<Wrapper>
			<TableOfContents
				tableOfContents={tableItems}
				format={numberedListDisplayFormat}
			/>
		</Wrapper>
	);
};

numberedList.storyName = 'numberedList';
