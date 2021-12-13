/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';

import { CommentCount } from './CommentCount';
import { decidePalette } from '../lib/decidePalette';
import { getAllThemes } from '../../../fixtures/manual/articles';

export default {
	component: CommentCount,
	title: 'Components/CommentCount',
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
				palette={decidePalette({
					theme: ArticleSpecial.SpecialReport,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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
				palette={decidePalette({
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
			/>
		</div>
	);
};
Undefined.story = { name: 'with count undefined' };

export const DeadBlog = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div
					css={css`
						display: flex;
						flex-direction: row;
						align-items: flex-start;
						width: 480px;
					`}
				>
					<CommentCount
						isCommentable={true}
						setIsExpanded={() => {}}
						commentCount={1154}
						palette={decidePalette(format)}
					/>
				</div>
			))}
		</>
	);
};
DeadBlog.story = {
	name: 'Deadblog - All pillars',
	viewport: {
		defaultViewport: 'tablet',
	},
};
