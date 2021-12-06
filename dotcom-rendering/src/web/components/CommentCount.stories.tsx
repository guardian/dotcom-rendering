/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';

import { CommentCount } from './CommentCount';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: CommentCount,
	title: 'Components/CommentCount',
};

const opinionFormat = {
	theme: ArticlePillar.Opinion,
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const specialReportFormat: ArticleFormat = {
	theme: ArticleSpecial.SpecialReport,
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const newsFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

export const SpecialReportStory = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={306}
				palette={decidePalette(specialReportFormat)}
			/>
		</div>
	);
};
SpecialReportStory.story = { name: 'with theme SpecialReport' };

export const NewsStory = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={36}
				palette={decidePalette(newsFormat)}
			/>
		</div>
	);
};
NewsStory.story = { name: 'with theme News' };

export const LargeNumber = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={10836}
				palette={decidePalette(opinionFormat)}
			/>
		</div>
	);
};
LargeNumber.story = { name: 'with a large number' };

export const Zero = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={0}
				palette={decidePalette(opinionFormat)}
			/>
		</div>
	);
};
Zero.story = { name: 'with zero comments' };

export const Undefined = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				palette={decidePalette(opinionFormat)}
			/>
		</div>
	);
};
Undefined.story = { name: 'with count undefined' };
