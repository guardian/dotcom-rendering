import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { TableOfContentsItem } from '../types/frontend';
import { TableOfContents } from './TableOfContents.importable';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
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

const tableItems = [headline1, headline2, headline3];

export const defaultStory: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} format={format} />
		</Wrapper>
	);
};

defaultStory.storyName = 'default';
defaultStory.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];

export const immersive: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} format={format} />
		</Wrapper>
	);
};

immersive.storyName = 'immersive';
immersive.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Immersive,
			theme: Pillar.News,
		},
	]),
];

export const numberedList: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} format={format} />
		</Wrapper>
	);
};

numberedList.storyName = 'numberedList';
numberedList.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.NumberedList,
			theme: Pillar.News,
		},
	]),
];
