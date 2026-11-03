import { css } from '@emotion/react';
import { article17, headlineBold24, space } from '@guardian/source/foundations';
import type { StoryObj } from '@storybook/react-webpack5';
import { useId } from 'react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../lib/articleFormat';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { TableOfContents } from './TableOfContents.island';

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

const tableItemsLong = [
	headline1,
	headline2,
	headline3,
	{ id: 'fourth-h2-text', title: 'Fourth h2 text' },
	{ id: 'fifth-h2-text', title: 'Fifth h2 text' },
	{ id: 'sixth-h2-text', title: 'Sixth h2 text' },
];

export const filter: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Wrapper>
			<TableOfContents
				tableOfContents={tableItems}
				format={format}
				isFilterArticle={true}
			/>
		</Wrapper>
	);
};

filter.storyName = 'filter';
filter.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];

/**
 * Six items, so that the disclosure starts closed and the collapsed bar can be
 * seen at rest. The pinned state, where the label is replaced by the current
 * section, needs a scrolling page and is covered by the unit tests instead.
 */
export const filterCollapsed: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Wrapper>
			<TableOfContents
				tableOfContents={tableItemsLong}
				format={format}
				isFilterArticle={true}
			/>
		</Wrapper>
	);
};

filterCollapsed.storyName = 'filterCollapsed';
filterCollapsed.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];

/**
 * `splitTheme` renders a light and a dark copy of this story in the same
 * document, so each copy prefixes its heading ids to keep them unique. Without
 * that, the dark copy's links and scroll spy would find the light copy's
 * headings instead of its own.
 */
const FilterWithSections = ({ format }: { format: ArticleFormat }) => {
	const prefix = useId();
	const items = tableItemsLong.map((item) => ({
		...item,
		id: `${prefix}${item.id}`,
	}));

	return (
		<Wrapper>
			<TableOfContents
				tableOfContents={items}
				format={format}
				isFilterArticle={true}
			/>
			{items.map((item) => (
				<section key={item.id}>
					<h2
						id={item.id}
						css={css`
							${headlineBold24}
							margin-top: ${space[6]}px;
						`}
					>
						{item.title}
					</h2>
					<p
						css={css`
							${article17}
							height: 60vh;
						`}
					>
						Body copy for {item.title}, tall enough that each
						section can be scrolled to in turn.
					</p>
				</section>
			))}
		</Wrapper>
	);
};

/**
 * The selected state and the pinned label are both driven by where the reader
 * is in the page, so this story renders the sections the bar points at. Scroll
 * it to see the label take the current section's heading, then open the bar to
 * see that section marked in the list.
 */
export const filterWithSections: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => <FilterWithSections format={format} />;

filterWithSections.storyName = 'filterWithSections';
filterWithSections.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];
